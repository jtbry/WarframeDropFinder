const express = require('express')
const router = express.Router()

router.use('/items', require('./items').route)
router.use('/drops', require('./drops').route)

// todo: split search types for advanced search
// items: return only items that match search
// components: return only components that match search
// drops: return only drop locations that match search
// nodes: return only nodes that match search
// all: search for all of the above
// may need to write a script to see what categories don't have a 'name' element

module.exports = router
