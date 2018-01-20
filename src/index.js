//New store
import React from 'react'
import ReactDom from 'react-dom'
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import thunk from 'redux-thunk'
import {
  Provider
} from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux' //Use applymiddleware to start thunk middleware

import reducers from './reducer'//合并两个模块
import './config'//Execute config.js

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))


ReactDom.render(
  (<Provider store={store}>
		<BrowserRouter>
		<Switch>
			{/*only render the very first route*/}
		</Switch>
		</BrowserRouter>
	</Provider>),
  document.getElementById('root')
)
//Add gun pass to the App component as parameter
