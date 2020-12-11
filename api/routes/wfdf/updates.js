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
  const db = req.app.get('db')
  db.collection('updates').aggregate(
    [
      { $sort: { ended: 1 } },
      {
        $group:
          {
            _id: '$type',
            type: { $last: '$type' },
            started: { $last: '$started' },
            ended: { $last: '$ended' },
            update: { $last: '$update' }
          }
      }
    ]
  )
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
