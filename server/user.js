const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = model.getModel('user')

Router.get('/list',function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})
Router.get('/info',function(req, res) {
  //User have cookie or not
  return res.json({code:1})
})

module.exports = Router