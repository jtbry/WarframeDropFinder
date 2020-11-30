const express = require('express')
const router = express.Router()
const logger = require('../../helpers/logger')

const docs = [
  {
    method: 'post',
    summary: 'Get drop locations for an item',
    reqBody: {
      required: true,
      requiredParams: ['itemUniqueName'],
      schema: {
        type: 'object',
        properties: {
          itemUniqueName: {
            type: 'string',
            example: '/Lotus/Weapons/Tenno/Rifle/Rifle'
          },
          isComponent: {
            type: 'boolean',
            example: false
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
  if (req.body.isComponent) {
    // Return drops for a component
    db.collection('items').find({ 'components.uniqueName': req.body.itemUniqueName }, { projection: { components: { $elemMatch: { uniqueName: req.body.itemUniqueName } } } }).toArray()
      .then(result => {
        if (result[0] && result[0].components[0]) {
          res.json({
            isComponent: true,
            item: result[0].components[0]
          })
        } else res.status(404).json({ error: 'Component not found' })
      })
      .catch(error => {
        logger.error(error.stack)
        res.status(500).json({ error: 'Internal Server Error Occured' })
      })
  } else {
    // Return drops for an item
    db.collection('items').findOne({ uniqueName: req.body.itemUniqueName }, { projection: { _id: 0, drops: 1, uniqueName: 1, name: 1, imageName: 1 } })
      .then(item => {
        if (item) {
          res.json({
            isComponent: false,
            item: item
          })
        } else res.status(404).json({ error: 'Item not found' })
      })
      .catch(error => {
        logger.error(error.stack)
        res.status(500).json({ error: 'Internal Server Error Occured' })
      })
  }
})

module.exports = {
  route: router,
  spec: docs
}
