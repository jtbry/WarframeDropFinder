const express = require('express')
const router = express.Router()

const docs = [
  {
    method: 'post',
    summary: 'Search for a drop location by name',
    reqBody: {
      required: true,
      requiredParams: ['locationName'],
      schema: {
        type: 'object',
        properties: {
          locationName: {
            type: 'string',
            example: 'Lith S'
          },
          limit: {
            type: 'number',
            example: 4
          }
        }
      }
    },
    responses: [200, 400, 500]
  }
]

router.post('/', (req, res) => {
  // todo: goal of this endpoint is to find all drops.location || components.drops.location similar to given locationName
  //  need to be unique occurences and need to fetch the locationName only, not the whole item
  if (!req.body.locationName || typeof req.body.locationName !== 'string' || req.body.locationName.length < 3) return res.status(400).json({ error: 'Invalid locationName given' })
  res.json({ error: 'wip' })
})

module.exports = {
  route: router,
  spec: docs
}
