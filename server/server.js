import express from 'express'
//import ReactElement from 'react-element'
import model from './model'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import staticPath from '../build/asset-manifest.json'
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'
assethook({
	extensions:['png'],
	limit: 9000
})

import React from 'react'
import {
  Provider
} from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux' //Use applymiddleware to start thunk middleware
import thunk from 'redux-thunk'
import {
  StaticRouter
} from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer'//Combine reducers modules into one reducer
import {
  renderToString,
	renderToNodeStream
} from 'react-dom/server' /*Turn div react component into compilble front end div component*/


const Chat = model.getModel('chat')
const app = express()
const server = require('http').Server(app) //First using http module emcorporate express server
const io = require('socket.io')(server) //then pass the above serve


//Above achieve bind the express with socket.io
io.on('connection', function(socket) { /*Socket is current connection request. io is global request.*/
  socket.on('sendmsg', function(data) {
    const {
      from,
      to,
      msg
    } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({
      chatid,
      from,
      to,
      content: msg
    }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter) //Enable middleware, anything relate to user prefix, child router is defined in
//user router.
//Work with express: Need to accordance the socket.io and http's interface
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
	const store = createStore(reducers, compose(
	  applyMiddleware(thunk)
	))
	let context = {}
res.write(`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="theme-color" content="#000000">

		<title>React App</title>
		<link rel="stylesheet" href="/${staticPath['main.css']}">
	</head>
	<body>
		<noscript>
			You need to enable JavaScript to run this app.
		</noscript>
		<div id="root">`)
const markupStream = renderToNodeStream(
	(<Provider store={store}>
	<StaticRouter
		location={req.url}
		context={context}>
		<App></App>
	</StaticRouter>
</Provider>)
)
markupStream.pipe(res,{end:false})
markupStream.on('end',()=>{
	res.write(`
	</div>
	<script src="/${staticPath['main.js']}"></script>
	</body>
	</html>
	`)
	res.end()
})

//res.write(pageHtml)
//const htmlRes = (<App></App>)
//res.send(htmlRes)
	  //return res.sendFile(path.resolve('build/index.html')) //Path.resolve: Correct path, translate relative path into absolute path.
})
/*If url start with user, return next, app.use('/user',userRouter).
Otherwise render the index.html file, all the routing happens in the front end, the back end only needs
to do intercept if needed.*/
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function() {
  console.log('Node app start at port 9093')
})
