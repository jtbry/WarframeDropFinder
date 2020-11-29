const express = require('express')
const router = express.Router()

const docs = [
  {
    method: 'post',
    summary: 'Get details about a drop location',
    reqBody: {
      required: true,
      requiredParams: ['locationName'],
      schema: {
        type: 'object',
        properties: {
          locationName: {
            type: 'string'
          }
        }
      }
    },
    responses: [200, 400, 500]
  }
]

router.post('/', (req, res) => {
  if (!req.body.locationName || typeof req.body.locationName !== 'string') return res.status(400).json({ error: 'Invalid locationName given' })
  // todo: search by drop location
  // need to get all items where drops.location or components.drops.location == locationName
  // Need to make sure we return the proper items from this though
  res.json({ error: 'wip' })
})

module.exports = {
  route: router,
  spec: docs
}
