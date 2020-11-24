const express = require('express')
const router = express.Router()

router.use('/items', require('./itemSearch'))
router.use('/dropLocations', require('./dropLocationSearch'))

module.exports = router
