'use strict'

const router = require('express').Router()
const user = require('../../controllers/v1/users')
const { validate } = require('../../validation/index')
const userValidator = require('../../validation/user')

// Admin Routes will be define here
router.get('/user', user.findAll)
router.post('/user', validate(userValidator.addUser), user.createUser)
router.put('/user/:id', validate(userValidator.updateUser), user.updateUser)
router.delete('/user/:id', user.deleteUser)
router.get('/user/:id', user.getOneUser)

module.exports = router
