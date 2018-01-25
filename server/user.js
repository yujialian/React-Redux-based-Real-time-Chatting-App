const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}//Set password and doc version to 0 for security.
Router.get('/list',function(req, res) {
  //User.remove({}, function(err,doc){})
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})
Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)}, _filter, function(err, doc) {
    if(!doc) {
      return res.json({code:1, msg:'Username and/or password is invalid'})
    }
    res.cookie('userid', doc._id)//_id generate by mongodb, it's exclusive from each other.
    return res.json({code:0, data:doc})
  })
})
Router.post('/register', function(req, res) {
  console.log("req body is:", req.body)
  const {user, pwd, type} = req.body
  User.findOne({user}, function(err,doc) {//In es6 User.findOne({user:user} can be writen as: findOne({user}
    if(doc) {
      return res.json({code:1, msg:'Duplicate username!'})
    }
    const userModel = new User({user:type,pwd:md5Pwd(pwd)})
    userModel.save(function(e,d) {
      if(e) {
        return res.json({code:1, msg:'Back end encounter some problem...'})
      }
      const {user, type, _id} = d
      res.cookie('userid',_id)
      return res.json({code:0,data: {user, type, _id}})
    })
    // User.create({user,pwd:md5Pwd(pwd),type}, function(err,doc) {
    //   if(err) {
    //     return res.json({code:1, msg:'Back-end err!'})
    //   }
    //   return res.json({code:0})
    // })
  })
})
Router.get('/info',function(req, res) {
  const {userid} = req.cookies
  /*User have cookie or not*/
  if(!userid) {
    return res.json({code:1})
  }
  User.findOne({_id:userid}, _filter, function(err,doc) {
    if(err) {
      return res.json({code:1, msg:'Problems in this request, please re-login.'})
    }
    if(doc) {
      return res.json({code:0,data:doc})
    }
  })


})
function md5Pwd(pwd) {//Encript user's password.
  const salt = 'react_is_cool_asef234g35234far23#!@!#$(%)'
  return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router
