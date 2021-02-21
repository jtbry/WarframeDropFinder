const express = require('express')
const router = express.Router()
const logger = require('../../helpers/logger')

const docs = [
  {
    method: 'post',
    summary: 'Get a component by it\'s unique name',
    reqBody: {
      required: true,
      requiredParams: ['componentUniqueName'],
      schema: {
        type: 'object',
        properties: {
          componentUniqueName: {
            type: 'string',
            example: '/Lotus/Types/Recipes/WarframeRecipes/AshPrimeBlueprint'
          }
        }
      }
    },
    responses: [200, 400, 500]
  }
]

router.post('/', (req, res) => {
  if (!req.body.componentUniqueName || typeof req.body.componentUniqueName !== 'string') return res.status(400).json({ error: 'Invalid componentUniqueName given' })
  const db = req.app.get('db')
  const query = { 'components.uniqueName': req.body.componentUniqueName }
  const setProjection = { projection: { _id: 0, uniqueName: 1, name: 1, description: 1, imageName: 1, marketData: 1 } }
  const componentProjection = { projection: { components: { $elemMatch: { uniqueName: req.body.componentUniqueName } } } }
  Promise.all([
    db.collection('items').find(query, setProjection).toArray(),
    db.collection('items').find(query, componentProjection).toArray()
  ])
    .then(results => {
      if (!results[0] || !results[1] || !results[1][0]) {
        res.status(404).json({ error: 'Component or set not found' })
      } else {
        if (results[1][0].components[0].parents) {
          delete results[1][0].components[0].parents
        }
        res.json({
          component: results[1][0].components[0],
          sets: results[0]
        })
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
