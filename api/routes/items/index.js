const express = require('express')
const router = express.Router()

router.use('/', require('./items').route)
router.use('/patchlogs', require('./patchlogs').route)
router.use('/component', require('./component').route)

module.exports = router
