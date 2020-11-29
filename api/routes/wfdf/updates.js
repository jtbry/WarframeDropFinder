const express = require('express')
const router = express.Router()
const logger = require('../../helpers/logger')

const docs = [
  {
    method: 'get',
    summary: 'Get recent WFDF updates',
    responses: [200, 500]
  }
]

router.get('/', (req, res) => {
  // todo: return only the most recent from each type of update
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

module.exports = {
  route: router,
  spec: docs
}
