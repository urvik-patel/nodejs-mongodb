'use strict'

const router = require('express').Router()
const user = require('../../controllers/v1/users')

// Admin Routes will be define here
router.get('/user', user.findAll)
router.post('/user', user.createUser)
router.put('/user/:id', user.updateUser)
router.delete('/user/:id', user.deleteUser)
router.get('/user/:id', user.getOneUser)

module.exports = router
