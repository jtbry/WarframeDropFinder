const express = require('express')
const router = express.Router()
const logger = require('../../helpers/logger')

const docs = [
  {
    method: 'post',
    summary: 'Get detailed patchlogs for an item',
    reqBody: {
      required: true,
      requiredParams: ['itemUniqueName'],
      schema: {
        type: 'object',
        properties: {
          itemUniqueName: {
            type: 'string',
            example: '/Lotus/Powersuits/Ninja/Ninja'
          }
        }
      }
    },
    responses: [200, 400, 404, 500]
  }
]

router.post('/', (req, res) => {
  if (!req.body.itemUniqueName || typeof req.body.itemUniqueName !== 'string') return res.status(400).json({ error: 'Invalid itemUniqueName given' })
  const db = req.app.get('db')
  db.collection('items').findOne({ uniqueName: req.body.itemUniqueName }, { projection: { _id: 0, patchlogs: 1 } })
    .then(item => {
      if (item) {
        res.json(item)
      }
      else res.status(404).json({ error: 'Item not found' })
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
