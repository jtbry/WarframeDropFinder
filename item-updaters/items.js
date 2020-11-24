const https = require('https')
const fs = require('fs')
const crypto = require('crypto')
const { Writable } = require('stream')
const StreamArray = require('stream-json/streamers/StreamArray')
const { isEqual } = require('lodash')

class Items {
  constructor () {
    this.itemFileUrl = 'https://raw.githubusercontent.com/WFCD/warframe-items/development/data/json/All.json'
  }

  /**
   * Use tmp_all.json to update the items database, returns object describing the update for logging
   */
  updateItems (db, itemMap) {
    // todo: item cleaning. For now we will store the entire object as given from warframe-items but
    //   in the future we should probably split items up to help save space and bandwidth
    //   for example: checking for common components like Orokin Cells

    // if there is a way to upsert multiple items in one query that could be used
    // to trade less queries for more memory usage
    // since we are not able to upsert multiple items at once we should optimize
    // for memory usage by only processing one object at a time (stream-json)
    return new Promise((resolve, reject) => {
      const updateObject = { added: 0, changed: 0, unchanged: 0, removed: 0 }
      const itemStream = new Writable({
        async write ({ key, value }, encoding, callback) {
          if (value) {
            const existingItem = itemMap.get(value.uniqueName)
            if (!existingItem) {
              // Add new item
              // Upsert instead of insert will ensure no duplicates are added
              // uniqueName field should be indexed in mongodb for performance increase
              // when an item is not added, and filtering by indexed field, insert vs upsert performance should be similar
              await db.collection('items').updateOne({ uniqueName: value.uniqueName }, { $set: value }, { upsert: true })
              updateObject.added += 1
            } else {
              // Update existing item
              if (!isEqual(existingItem, value)) {
                // todo: don't consider wikiaThumbnail as a change, these change/add often and it's misleading
                await db.collection('items').updateOne({ uniqueName: value.uniqueName }, { $set: value }, { upsert: true })
                updateObject.changed += 1
              } else updateObject.unchanged += 1
              // Remove from map to speed up future searches & free memory
              itemMap.delete(value.uniqueName)
            }
          }
          callback()
        },
        objectMode: true
      })

      const fileStream = fs.createReadStream('./tmp_all.json')
      const jsonStream = StreamArray.withParser()
      fileStream.pipe(jsonStream.input)
      jsonStream.pipe(itemStream)

      itemStream.on('finish', async () => {
        if (itemMap.size > 0) {
          // Any remaining items have been removed from all.json
          for (const entry of itemMap.entries()) {
            await db.collection('items').deleteOne({ uniqueName: entry[0] })
            updateObject.removed += 1
          }
        }
        resolve(updateObject)
      })
    })
  }

  /**
   * Download all.json from wfcd repository
   */
  downloadItemsContent () {
    return new Promise((resolve, reject) => {
      // Create writeable stream
      this.removeItemContentsFile()
      const file = fs.createWriteStream('./tmp_all.json')
      const incomingHash = crypto.createHash('md5')

      // Get all.json from wfcd github repo
      let noErrors = true
      https.get(this.itemFileUrl, (response) => {
        if (response.statusCode !== 200) noErrors = false
        // Pipe output to the file
        response.pipe(file)
        // Create hash for the incoming file
        response.on('data', (data) => {
          incomingHash.update(data)
        })
        file.on('finish', () => {
          file.close()
          if (noErrors) {
            resolve(incomingHash.digest('hex'))
          } else {
            reject(new Error('StatusError when downloading all.json'))
          }
        })
      }).on('error', (err) => {
        file.close()
        this.removeItemContentsFile()
        reject(err)
      })
    })
  }

  /**
   * Remove the downloaded file, save disk space
   */
  removeItemContentsFile () {
    if (fs.existsSync('tmp_all.json')) fs.unlinkSync('./tmp_all.json')
  }

  /**
   * Check if items database needs to be updated
   */
  async updateIfNeeded (db) {
    const startedDate = new Date()
    const incomingHash = await this.downloadItemsContent()
    if (await db.collection('updates').findOne({ hash: incomingHash, type: 'Items' })) {
      this.removeItemContentsFile()
      return false
    } else {
      const existingItems = await db.collection('items').find({}, { projection: { _id: 0 } }).toArray()
      const itemMap = new Map(existingItems.map(item => [item.uniqueName, item]))
      const updateResult = await this.updateItems(db, itemMap)
      this.removeItemContentsFile()
      const finishedDate = new Date()
      await db.collection('updates').insertOne({
        hash: incomingHash,
        type: 'Items',
        started: startedDate.toISOString(),
        ended: finishedDate.toISOString(),
        added: updateResult.added,
        changed: updateResult.changed,
        unchanged: updateResult.unchanged
      })
      return updateResult
    }
  }
}

module.exports = new Items()
