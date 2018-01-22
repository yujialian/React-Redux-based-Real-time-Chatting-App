const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')

Router.get('/list',function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})
Router.post('/register', function(req, res) {
  console.log("req body is:", req.body)
  const {user, pwd, type} = req.body
  User.findOne({user}, function(err,doc) {//In es6 User.findOne({user:user} can be writen as: findOne({user}
    if(doc) {
      return res.json({code:1, msg:'Duplicate username!'})
    }
    User.create({user,pwd,type}, function(err,doc) {
      if(err) {
        return res.json({code:1, msg:'Back-end err!'})
      }

      return res.json({code:0})
    })
  })
})
Router.get('/info',function(req, res) {
  //User have cookie or not
  return res.json({code:1})
})

module.exports = Router
