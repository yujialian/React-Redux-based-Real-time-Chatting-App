const express = require('express')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
//Connect mongo, using imooc
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
	console.log('mongo! connected! ')
})
//Rest is like mysql's table, in mongodb, we have concepts of documentation and field
const User = mongoose.model('user', new mongoose.Schema({
	user:{type:String, require:true},
	age:{type:Number, require:true}
}))
//Add data
// User.create({
// 	user:'xiaoming',
// 	age:20
// },function(err,doc) {
// 	if(!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
//})
// User.remove({age:10}, function(err,doc) {
// 	console.log(doc)
// })
User.update({'user':'xiaohua'},{'$set':{age:11}},function(err,doc) {
	console.log(doc)
	console.log(err)
})
//new app
const app = express()
app.get('/',function(req, res) {
	res.send('<h1>Hello world</h1>')
})

app.get('/data',function(req,res) {
	User.findOne({user:'xiaoming'},function(err,doc) {
		res.json(doc)
	})
	//res.json({name1:'imooc jiushi niubi',type:'IT'})
})
// app.get('/delete', function() {

// })

app.listen(9093,function() {
	console.log('Node app start at port 9093')
})