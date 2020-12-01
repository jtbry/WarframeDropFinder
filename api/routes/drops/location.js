const express = require('express')
const router = express.Router()
const logger = require('../../helpers/logger')

const docs = [
  {
    method: 'post',
    summary: 'Get all items dropped by a location',
    reqBody: {
      required: true,
      requiredParams: ['locationName'],
      schema: {
        type: 'object',
        properties: {
          locationName: {
            type: 'string',
            example: 'Lith S3 Relic'
          }
        }
      }
    },
    responses: [200, 400, 404, 500]
  }
]

router.post('/', (req, res) => {
  if (!req.body.locationName || typeof req.body.locationName !== 'string') return res.status(400).json({ error: 'Invalid locationName given' })
  const db = req.app.get('db')
  const locationAggregation = [
    { $match: { $or: [{ 'drops.location': req.body.locationName }, { 'components.drops.location': req.body.locationName }] } },
    { $project: { _id: 0, uniqueName: 1, drops: 1, marketData: 1, 'components.marketData': 1, 'components.uniqueName': 1, 'components.drops': 1 } },
    { $unwind: { path: '$components', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$components.drops', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$drops', preserveNullAndEmptyArrays: true } },
    { $match: { $or: [{ 'drops.location': req.body.locationName }, { 'components.drops.location': req.body.locationName }] } }
  ]
  db.collection('items').aggregate(locationAggregation).toArray()
    .then(results => {
      if (!results || results.length <= 0) res.status(404).json({ error: 'Location not found' })
      else {
        res.json(results)
      }
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
