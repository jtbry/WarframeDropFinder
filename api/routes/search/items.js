const express = require('express')
const router = express.Router()
const logger = require('../../helpers/logger')

const docs = [
  {
    method: 'post',
    summary: 'Search for an item by name',
    reqBody: {
      required: true,
      requiredParams: ['itemName'],
      schema: {
        type: 'object',
        properties: {
          itemName: {
            type: 'string',
            example: 'Ash'
          },
          limit: {
            type: 'number',
            example: 4
          },
          itemFilters: {
            type: 'object'
          }
        }
      }
    },
    responses: [200, 400, 500]
  }
]

router.post('/', (req, res) => {
  if (!req.body.itemName || typeof req.body.itemName !== 'string' || req.body.itemName.length < 3) return res.status(400).json({ error: 'Invalid itemName given' })
  const db = req.app.get('db')

  // Build MongoDB Query
  const searchQuery = Object.assign({
    name: new RegExp(req.body.itemName, 'i')
  }, req.body.itemFilters || {})
  const searchProjection = {
    _id: 0,
    uniqueName: 1,
    name: 1,
    type: 1,
    category: 1,
    imageName: 1,
    tradable: 1,
    vaulted: 1
  }

  // Execute Query
  const resultsCursor = db.collection('items').find(searchQuery, { projection: searchProjection })
  if (req.body.limit && typeof req.body.limit === 'number') {
    resultsCursor.limit(req.body.limit)
  } else resultsCursor.limit(4) // Default limit is four items

  // Return Results
  resultsCursor.toArray()
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      logger.error(error.stack)
      res.status(500).json({ error: 'Internal Server Error Occured' })
    })
})

module.exports = {
  route: router,
  spec: docs
}
