const express = require('express')
const router = express.Router()
const logger = require('../helpers/logger')

/**
 * @swagger
 * /patchlogs:
 *  get:
 *    tags:
 *      - General
 *    summary: Get recent Warframe patchlogs
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: ERROR
 */
router.get('/', (req, res) => {
  const db = req.app.get('db')
  db.collection('patchlogs').find({}, { projection: { _id: 0 } })
    .sort({ date: -1 })
    .limit(4)
    .toArray()
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      logger.error(error)
      res.status(500).json({ error: 'Internal Server Error Occured' })
    })
})

module.exports = router
