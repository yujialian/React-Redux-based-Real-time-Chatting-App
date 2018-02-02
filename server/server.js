import express from 'express'
import bodyParser from 'body-parser'
import utils from 'utility'
import model from './model'
import cookieParser from 'cookie-parser'
import path from 'path'

const Chat = model.getModel('chat')
const app = express()
const server = require('http').Server(app)//First using http module emcorporate express server
const io = require('socket.io')(server)//then pass the above serve


//Above achieve bind the express with socket.io
io.on('connection',function(socket) {/*Socket is current connection request. io is global request.*/
	socket.on('sendmsg', function(data) {
		const {from, to, msg} = data
		const chatid = [from, to].sort().join('_')
		Chat.create({chatid, from, to, content:msg}, function(err, doc) {
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
	})
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)//Enable middleware, anything relate to user prefix, child router is defined in
//user router.
//Work with express: Need to accordance the socket.io and http's interface
app.use(function(req, res, next) {
	if(req.url.startsWith('/user/')||req.url.startsWith('/static/')) {
		return next()
	}
	console.log("path.resolve: ",path.resolve('build/index.html'))
	return res.sendFile(path.resolve('build/index.html'))//Path.resolve: Correct path, translate relative path into absolute path.
})
/*If url start with user, return next, app.use('/user',userRouter).
Otherwise render the index.html file, all the routing happens in the front end, the back end only needs
to do intercept if needed.*/
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function() {
	console.log('Node app start at port 9093')
})
