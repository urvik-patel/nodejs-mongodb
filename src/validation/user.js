const Joi = require('joi')

exports.addUser = Joi.object()
  .keys({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .required(),
    gender: Joi.string()
      .required()
  })

exports.updateUser = Joi.object()
  .keys({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .required(),
    gender: Joi.string()
      .required()
  })
