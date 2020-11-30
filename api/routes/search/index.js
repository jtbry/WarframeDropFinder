const express = require('express')
const router = express.Router()

router.use('/items', require('./items').route)
router.use('/drops', require('./drops').route)

// todo: split search types for advanced search
// items: return only items that match search
// components: return only components that match search
// drops: return only drop locations that match search
// all: search for all of the above

module.exports = router
