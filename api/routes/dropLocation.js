const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /dropLocation:
 *  post:
 *    tags:
 *      - General
 *    summary: Get details about a drop location
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
 *                  type: string
 *            examples:
 *              relic:
 *                value:
 *                  locationName: Lith S3 Relic
 *              other:
 *                value:
*                  locationName: Misery
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: INVALID REQUEST
 *      500:
 *        description: ERROR
 */
router.post('/', (req, res) => {
  if (!req.body.locationName || typeof req.body.locationName !== 'string') return res.status(400).json({ error: 'Invalid locationName given' })
  // todo: search by drop location
  // need to get all items where drops.location or components.drops.location == locationName
  // Need to make sure we return the proper items from this though
  res.json({ error: 'wip' })
})

module.exports = router
