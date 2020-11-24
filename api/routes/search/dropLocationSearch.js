const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /search/dropLocations:
 *  post:
 *    tags:
 *      - Search
 *    summary: Search for a drop location by name
 *    consumes:
 *      - application/json
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - locationName
 *              properties:
 *                locationName:
 *                  example: Lith S
 *                  type: string
 *                limit:
 *                  type: number
 *                  example: 4
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: INVALID REQUEST
 *      500:
 *        description: ERROR
 */
router.post('/', (req, res) => {
  // todo: goal of this endpoint is to find all drops.location || components.drops.location similar to given locationName
  //  need to be unique occurences and need to fetch the locationName only, not the whole item
  if (!req.body.locationName || typeof req.body.locationName !== 'string' || req.body.locationName.length < 3) return res.status(400).json({ error: 'Invalid locationName given' })
  res.send('wip')
})

module.exports = router
