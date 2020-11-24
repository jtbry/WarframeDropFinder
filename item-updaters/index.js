const items = require('./items')
const patchlogs = require('./patchlogs')
const mongoClient = require('mongodb').MongoClient
const mongoDbUrl = process.env.mongoConnectionUrl || 'mongodb://localhost:27017'

async function main () {
  const client = await mongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
  const db = await client.db('wfdf')

  // Make sure indexed fields exist, this operation is idempotent: no need to check for existence
  db.collection('updates').createIndex({ hash: 1 }, { unique: true })
  db.collection('items').createIndex({ uniqueName: 1 }, { unique: true })

  // Update items if needed
  try {
    console.log('Checking for items updates...')
    const update = await items.updateIfNeeded(db)
    if (update) {
      console.log(update)
    } else console.log('Items are up to date')
  } catch (err) {
    console.log('Error when trying to update items')
    console.log(err)
  }

  // Update patchlogs if needed
  try {
    console.log('Checking for patchlogs updates...')
    const update = await patchlogs.updateIfNeeded(db)
    if (update) {
      console.log(update)
    } else console.log('Patchlogs are up to date')
  } catch (err) {
    console.log('Error when trying to update patchlogs')
    console.log(err)
  }

  // Check for updates once every hour
  setInterval(main, 1000 * 60 * 60)
}

main()
