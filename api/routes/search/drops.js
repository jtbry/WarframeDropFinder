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
  // todo: search for drop locations similar to given name, same as item search
  res.json({ error: 'wip' })
})

module.exports = {
  route: router,
  spec: docs
}
