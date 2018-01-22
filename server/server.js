const express = require('express')
const userRouter = require('./user')
const app = express()
app.use('/user',userRouter)//Enable middleware, anything relate to user prefix, child router is defined in
//user router.
app.listen(9093,function() {
	console.log('Node app start at port 9093')
})
