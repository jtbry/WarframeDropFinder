const express = require('express')
const router = express.Router()

router.use('/items', require('./items').route)
router.use('/dropLocations', require('./dropLocations').route)

module.exports = router
