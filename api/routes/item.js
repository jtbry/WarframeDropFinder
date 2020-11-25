const express = require('express')
const router = express.Router()
const logger = require('../helpers/logger')

/**
 * @swagger
 * /item:
 *  post:
 *    tags:
 *      - General
 *    summary: Get an item by uniqueName
 *    consumes:
 *      - application/json
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - itemUniqueName
 *              properties:
 *                itemUniqueName:
 *                  type: string
 *                  example: /Lotus/Powersuits/Ninja/Ninja
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: INVALID REQUEST
 *      500:
 *        description: ERROR
 */
router.post('/', (req, res) => {
  if (!req.body.itemUniqueName || typeof req.body.itemUniqueName !== 'string') return res.status(400).json({ error: 'Invalid itemUniqueName given' })
  const db = req.app.get('db')
  db.collection('items').findOne({ uniqueName: req.body.itemUniqueName }, { projection: { _id: 0 } })
    .then(item => {
      if (item) {
        if (item.patchlogs) {
          item.patchlogLength = item.patchlogs.length
          delete item.patchlogs
        }
        res.json(item)
      }
      else res.status(404).json({ error: 'Item not found' })
    })
    .catch(error => {
      logger.error(error.stack)
      res.status(500).json({ error: 'Internal Server Error Occured' })
    })
})

module.exports = router
