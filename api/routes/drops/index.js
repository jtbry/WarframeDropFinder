const express = require('express')
const router = express.Router()

router.use('/item', require('./item').route)
router.use('/location', require('./location').route)

module.exports = router
