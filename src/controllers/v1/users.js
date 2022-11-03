const User = require('../../models/user')
const response = require('../../services/Response')
const mongoose = require('mongoose')

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search, gender, sort = '_id', order = 'DESC'} = req.headers
      // await User.createIndex({ title: 'firstName'})
      var query = {}
      if(search) {
        query.firstName = eval(`/.*${search}+.*/i`)
      }
      if(gender) {
        query.gender = eval(`/${gender}/i`)
      }
      const countData = await User.countDocuments(query);
      if(!countData) {
        response.successResponseWithoutData(res, 'No data found', 200)
      }
      let offset = 0 + (+limit * (+page - 1))
      const totalPages = Math.ceil(countData / limit)

      var sortObject = {}
      sortObject[sort] = order
      const data = await User.find(query).limit(limit).skip(offset).sort(sortObject)
      response.successResponseData(res, data, 200, 'success', {totalPages: totalPages, currentPage: page, recordsPerPage: limit})
    } catch (error) {
      console.log(error)
      response.errorResponseData(res, error)
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.send({
          code: 400,
          message: 'Some of the required fields are missing.'
        })
      }
      const data = await User.findById(id)
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      response.errorResponseData(res, error)
    }
  },

  createUser: async (req, res, next) => {
    try {
      console.log('in')
      const { firstName, lastName, email, gender } = req.body
      if (!firstName || !lastName || !email || !gender) {
        return res.send({
          code: 400,
          message: 'Some of the required fields are missing.'
        })
      }

      const userData = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender
      })

      const data = await userData.save(userData)
      response.successResponseData(res, data, 201, 'success')
    } catch (error) {
      console.log('error', error)
      response.errorResponseData(res, error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const { firstName, lastName, email } = req.body
      if (!firstName || !lastName || !email || !id) {
        response.errorResponseData(res, null, 400, 'Some of the required fields are missing.')
      }
      const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      console.log(error)
      response.errorResponseData(res, error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params
      if (!id) {
        response.errorResponseData(res, null, 400, 'Some of the required fields are missing.')
      }
      const data = await User.findByIdAndRemove(id, { useFindAndModify: false })
      response.successResponseData(res, data, 200, 'success')
    } catch (error) {
      response.errorResponseData(res, error)
    }
  }
}
