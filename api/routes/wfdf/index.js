const express = require('express')
const router = express.Router()

router.use('/updates', require('./updates').route)
router.use('/patchlogs', require('./patchlogs').route)

module.exports = router
