const https = require('https')
const mongoClient = require('mongodb').MongoClient
const mongoDbUrl = process.env.mongoConnectionUrl || 'mongodb://localhost:27017'

class Market {
  constructor () {
    this.reqNum = 0
    this.reqErrors = 0
    this.reqShouldWait = false
    mongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
      .then(connection => {
        this.conn = connection
        this.db = connection.db('wfdf')
      })
      .catch(error => {
        this.error = error
      })
  }

  waitForInit () {
    return new Promise((resolve, reject) => {
      if (this.conn && this.db) resolve()
      else if (this.error) reject(this.error)
      else {
        const interval = setInterval(() => {
          if (this.error) reject(this.error)
          else if (this.conn && this.db) {
            clearInterval(interval)
            resolve()
          }
        }, 2000)
      }
    })
  }

  makeWfmApiUrl (itemSetName, itemType, returnItemEndpoint = false) {
    let itemEndpoint = ''
    itemEndpoint += itemSetName.toLowerCase().split(' ').join('_')
    if (itemType !== '') itemEndpoint += ('_' + itemType.toLowerCase().split(' ').join('_'))
    if (returnItemEndpoint) return itemEndpoint
    else return encodeURI(`https://api.warframe.market/v1/items/${itemEndpoint}/statistics`)
  }

  makeWfmApiRequest (url) {
    return new Promise((resolve, reject) => {
      let data = ''
      https.get(url, response => {
        switch (response.statusCode) {
          case 302:
            response.destroy()
            resolve({ unavailable: true })
            break
          case 503:
          case 429:
            response.destroy()
            this.reqShouldWait = true
            resolve(this.makeWfmApiUrl(url))
            break
          case 200:
            response.on('data', chunk => {
              data += chunk
            })
            response.on('end', () => {
              const dataJson = JSON.parse(data)
              if (dataJson.payload.statistics_live['48hours'].length >= 2) {
                resolve(dataJson.payload.statistics_live['48hours'])
              }
              else if (dataJson.payload.statistics_live['90days'].length >= 2) {
                resolve(dataJson.payload.statistics_live['90days'])
              } else resolve(undefined)
            })
            break
          default:
            response.destroy()
            reject(response.statusMessage)
        }
      }).on('error', error => {
        reject(error)
      })
    })
  }

  async getMarketDataForItem (itemSetName, itemType) {
    if (this.reqNum >= 6) this.reqErrors = 0
    if (this.reqNum >= 3) {
      // Simple self imposed rate limit from WFM reccomendations
      await new Promise(resolve => setTimeout(resolve, 3000))
      this.reqNum = 0
    }
    if (this.reqShouldWait) {
      // Forced rate limit / service unavailable
      await new Promise(resolve => setTimeout(resolve, 5000))
      this.reqShouldWait = false
    }

    const itemMarketUrl = this.makeWfmApiUrl(itemSetName, itemType)
    const itemMarketName = this.makeWfmApiUrl(itemSetName, itemType, true)
    try {
      let wfmMarketData = await this.makeWfmApiRequest(itemMarketUrl)
      if (wfmMarketData) {
        if (wfmMarketData.unavailable) {
          return {
            unavailable: true,
            lastUpdate: new Date()
          }
        }
        else {
          // todo: mod levels in pricing
          const targetDate = new Date()
          targetDate.setHours(targetDate.getHours() - 1, 0, 0, 0)
          wfmMarketData = wfmMarketData.filter(data => new Date(data.datetime).getTime() === targetDate.getTime())
          wfmMarketData = wfmMarketData.filter(data => {
            if (data.mod_rank) return (data.mod_rank === 0)
            else return true
          })

          const buyStats = wfmMarketData.find(data => data.order_type === 'buy')
          const sellStats = wfmMarketData.find(data => data.order_type === 'sell')
          if (!buyStats || !sellStats) return { wfmName: itemMarketName, lastUpdate: new Date() }
          return {
            wfmName: itemMarketName,
            sell: {
              volume: sellStats.volume,
              min: sellStats.min_price,
              max: sellStats.max_price,
              avg: sellStats.avg_price
            },
            buy: {
              volume: buyStats.volume,
              min: buyStats.min_price,
              max: buyStats.max_price,
              avg: buyStats.avg_price
            },
            lastUpdate: new Date()
          }
        }
      } else {
        return undefined
      }
    } catch (error) {
      console.log(itemMarketName)
      console.log(error)
      this.reqErrors += 1
    }
    // If 3/6 requests are erroring: throw exception to index.js, stop requests
    if (this.reqErrors >= 3) throw new Error('Too many request errors')
    this.reqNum += 1
  }

  async scrapeMarketData () {
    // todo: stagger these updates more so that
    // it is less load over more consistent time for both us and wfm
    if (this.error) throw this.error
    else if (!this.db || !this.conn) throw Error('No Db / Conn')
    const updateResult = { components: 0, items: 0, unchanged: 0 }

    const requiredLastUpdate = new Date()
    requiredLastUpdate.setHours((requiredLastUpdate.getHours() - 2))
    const itemProjection = {
      _id: 0,
      uniqueName: 1,
      name: 1,
      tradable: 1,
      marketData: 1,
      'components.name': 1,
      'components.tradable': 1,
      'components.marketData': 1
    }
    const itemsMissingData = await this.db.collection('items').find({
      $or: [
        { tradable: true, marketData: { $exists: false } },
        { 'components.tradable': true, 'components.marketData': { $exists: false } },
        {
          $or: [
            { 'marketData.lastUpdate': { $lte: requiredLastUpdate } },
            { 'components.marketData.lastUpdate': { $lte: requiredLastUpdate } }
          ]
        }
      ]
    }, itemProjection).toArray()

    if (itemsMissingData.length > 0) {
      console.log(`Updating market data for ${itemsMissingData.length} items`)
      for (const item of itemsMissingData) {
        let itemChanged = false
        if (item.tradable) {
          if (item.marketData && item.marketData.unavailable) continue
          item.marketData = await this.getMarketDataForItem(item.name, (item.components ? 'set' : ''))
          itemChanged = true
          updateResult.items += 1
        }

        if (item.components) {
          for (const component of item.components) {
            if (component.tradable) {
              if (component.marketData && component.marketData.unavailable) continue
              component.marketData = await this.getMarketDataForItem(item.name, component.name)
              itemChanged = true
              updateResult.components += 1
            }
          }
        }

        if (itemChanged) {
          await this.db.collection('items').updateOne({ uniqueName: item.uniqueName }, { $set: item })
        } else updateResult.unchanged += 1
      }
      return updateResult
    } else return undefined
  }
}

module.exports = new Market()
