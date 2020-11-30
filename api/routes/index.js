const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')

router.use('/api/v1/search', require('./search'))
router.use('/api/v1/items', require('./items'))
router.use('/api/v1/wfdf', require('./wfdf'))
// todo: component endpoint similar to item endpoint
// return component and what set it belongs to.
// front-end will have seperate page to display endpoints
// todo: crafting component endpoint
// return components like Neurodes and list of items they can make

router.use('/api/docs', swaggerUi.serve)
const swaggerDocument = require('../data/swagger.json')
router.get('/api/docs', swaggerUi.setup(swaggerDocument))

module.exports = router
