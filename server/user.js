const express = require('express')
const Router = express.Router()
const models = require('./model')
const utils = require('utility')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = {'pwd':0,'__v':0}//Set password and doc version to 0 for security.
// Chat.remove({}, function(err,doc) {
//
// })
Router.get('/list',function(req, res) {
  const {type} = req.query/*Post parameter use body to obtain, get parameter use query to obtain.*/
  //User.remove({}, function(err,doc){})
  //Chat.remove({},function(err,doc){})
  User.find({type}, function(err, doc) {
    return res.json({code:0,data:doc})
  })
})

Router.post('/readmsg',function(req,res) {
  const userid = req.cookies.userid
  const {from} = req.body
  //console.log(userid, from)
  Chat.update(
    {from,to:userid},
    {'$set':{read:true}},
    {'multi':true},
     function(err, doc) {
    console.log("Doc after update is: ", doc)
    if(!err) {
      return res.json({code:0, num:doc.nModified})
    }
    return res.json({code:1, msg:'Fail to update the message status!'})
  })
})

Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  if(!userid) {
    return json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err,doc) {
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    }, body)
    return res.json({code:0,data})
  })
})


Router.get('/getmsglist', function(req, res) {
  const user = req.cookies.userid

  User.find({},function(err,userdoc) {
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    //Find send in and send out message.
    Chat.find({'$or':[{from:user}, {to:user}]}, function(err,doc) {//$or:check multiple conditions.
      if(!err) {
        return res.json({code:0, msgs:doc, users:users})
      }
    })
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
    const userModel = new User({user:user,type:type,pwd:md5Pwd(pwd)})
    userModel.save(function(e,d) {
      if(e) {
        return res.json({code:1, msg:'Back end encounter some problem...'})
      }
      const {user, type, _id} = d
      res.cookie('userid',_id)
      return res.json({code:0,data: {user, type, _id}})
    })
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
