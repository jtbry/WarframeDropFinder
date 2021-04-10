const https = require('https')
const cheerio = require('cheerio')
const crypto = require('crypto')

class Patchlogs {
  constructor () {
    this.updatesPageUrl = 'https://forums.warframe.com/forum/3-pc-update-notes/page/1'
    this.requestOptions = {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }
  }

  async updatePatchlogs (db, patchlogsJson) {
    const updateObject = { majors: 0, hotfixes: 0, changed: 0 }
    for (const patchlog of patchlogsJson) {
      const existingPatchlog = await db.collection('patchlogs').findOne({ name: patchlog.name })
      if (existingPatchlog) {
        if (existingPatchlog.link !== patchlog.link) {
          await db.collection('patchlogs').updateOne({ _id: existingPatchlog._id }, { $set: { link: patchlog.link } })
          updateObject.changed += 1
        }
      } else {
        await db.collection('patchlogs').insertOne(patchlog)
        if (patchlog.name.match(/Hotfix/i)) updateObject.hotfixes += 1
        else updateObject.majors += 1
      }
    }
    return updateObject
  }

  /**
   * Parse the home page for a list of updates
   */
  parseUpdatePageData (rawPageData) {
    const pageJson = []
    const $ = cheerio.load(rawPageData)
    const updateLinks = $('h4 .ipsContained a')
    for (let i = 0; i < updateLinks.length; ++i) {
      const time = $(updateLinks[i].parentNode.parentNode.parentNode).find('time').attr('datetime')
      pageJson.push({
        name: updateLinks[i].attribs.title,
        link: updateLinks[i].attribs.href,
        date: time
      })
    }
    return pageJson
  }

  /**
   * Get the titles and urls of all updates on the front page
   */
  getUpdatePageData () {
    return new Promise((resolve, reject) => {
      let updatePageData = ''
      https.get(this.updatesPageUrl, this.requestOptions, (response) => {
        if (response.statusCode !== 200) throw new Error(`${response.statusCode}: ${response.statusMessage}`)
        response.on('data', (chunk) => {
          updatePageData += chunk
        })
        response.on('end', () => {
          resolve(updatePageData)
        })
      }).on('error', (err) => {
        updatePageData = ''
        reject(err)
      })
    })
  }

  /**
   * Update patchlogs database if needed
   */
  async updateIfNeeded (db) {
    const startedDate = new Date()
    const updatePageRaw = await this.getUpdatePageData()
    const updatePageJson = this.parseUpdatePageData(updatePageRaw)
    const incomingHash = crypto.createHash('md5').update(JSON.stringify(updatePageJson)).digest('hex')

    if (await db.collection('updates').findOne({ hash: incomingHash, type: 'Patchlogs' })) return false
    const updateResult = await this.updatePatchlogs(db, updatePageJson)
    const finishedDate = new Date()
    await db.collection('updates').insertOne({
      type: 'Patchlogs',
      hash: incomingHash,
      started: startedDate,
      ended: finishedDate,
      update: updateResult
    })
    return updateResult
  }
}

module.exports = new Patchlogs()
