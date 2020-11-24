const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

router.use('/api/v1/search', require('./search'))
router.use('/api/v1/item', require('./item'))
// todo: component endpoint similar to item endpoint
// return component and what set it belongs to.
// front-end will have seperate page to display endpoints
router.use('/api/v1/dropLocation', require('./dropLocation'))
router.use('/api/v1/patchlogs', require('./patchlogs'))
router.use('/api/v1/updates', require('./updates'))

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'WFDF API',
      description: 'Documentation for Warframe Drop Finder REST API.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      version: '1.0.0'
    },
    servers: [
      { url: '/api/v1' }
    ]
  },
  apis: ['./routes/*.js', './routes/search/*.js']
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)
router.use('/api/docs', swaggerUi.serve)
router.get('/api/docs', swaggerUi.setup(swaggerSpec))

module.exports = router
