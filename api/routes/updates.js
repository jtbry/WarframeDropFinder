const express = require('express')
const router = express.Router()
const logger = require('../helpers/logger')

/**
 * @swagger
 * /updates:
 *  get:
 *    tags:
 *      - General
 *    summary: Get recent WFDF updates
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: ERROR
 */
router.get('/', (req, res) => {
  const db = req.app.get('db')
  db.collection('updates').find({}, { projection: { _id: 0 } })
    .sort({ ended: -1 })
    .limit(4)
    .toArray()
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      logger.error(error.stack)
      res.status(500).json({ error: 'Internal Server Error Occured' })
    })
})

module.exports = router
