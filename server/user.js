const express = require('express')
const Router = express.Router()


Router.get('/info',function(req, res) {
  //User have cookie or not
  return res.json({code:1})
})

module.exports = Router
