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
    else return `https://api.warframe.market/v1/items/${itemEndpoint}/statistics`
  }

  makeWfmApiRequest (url) {
    return new Promise((resolve, reject) => {
      let data = ''
      https.get(url, response => {
        switch (response.statusCode) {
          case 302:
            response.destroy()
            resolve(undefined)
            break
          case 503:
          case 429:
            response.destroy()
            resolve(undefined)
            this.reqShouldWait = true
            break
          case 200:
            response.on('data', chunk => {
              data += chunk
            })
            response.on('end', () => {
              const dataJson = JSON.parse(data)
              resolve(dataJson.payload.statistics_live['48hours'])
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
        // todo: consider mod levels in pricing
        wfmMarketData = wfmMarketData.filter(o => o.order_type === 'sell')
        if (wfmMarketData.length <= 0) return undefined // No sell orders
        const itemMarketData = {
          name: itemMarketName,
          volume: wfmMarketData[0].volume,
          min: wfmMarketData[0].min_price,
          max: wfmMarketData[0].max_price,
          avg: wfmMarketData[0].avg_price,
          lastUpdate: new Date()
        }
        for (let i = 1; i < wfmMarketData.length; ++i) {
          if (wfmMarketData[i].min_price < itemMarketData.min) itemMarketData.min = wfmMarketData[i].min_price
          if (wfmMarketData[i].max_price > itemMarketData.max) itemMarketData.max = wfmMarketData[i].max_price
          // todo: is this volume number reliable??? It is giving fairly high numbers.
          itemMarketData.volume += wfmMarketData[i].volume
          itemMarketData.avg += wfmMarketData[i].avg_price
        }
        itemMarketData.avg = Math.round(itemMarketData.avg / wfmMarketData.length)
        return itemMarketData
      } else {
        return undefined
      }
    } catch (error) {
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
      for (const item of itemsMissingData) {
        let itemChanged = false
        if (item.tradable) {
          if (item.marketData !== null || (item.marketData && item.marketData.lastUpdate <= requiredLastUpdate)) {
            item.marketData = await this.getMarketDataForItem(item.name, (item.components ? 'set' : ''))
            itemChanged = true
            updateResult.items += 1
          }
        }

        if (item.components) {
          for (const component of item.components) {
            if (component.tradable) {
              if (component.marketData && !(component.marketData.lastUpdate <= requiredLastUpdate)) continue
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
