const express = require('express')
const router = express.Router()

router.use('/items', require('./items').route)
router.use('/drops', require('./drops').route)

module.exports = router
