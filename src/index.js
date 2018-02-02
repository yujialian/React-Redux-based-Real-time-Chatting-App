//New store
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import reducers from './reducer'//Combine reducers modules into one reducer
import App from './app'
import './config'//Execute config.js
import './index.css'

import {
  Provider
} from 'react-redux'
import {
  BrowserRouter
} from 'react-router-dom'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux' //Use applymiddleware to start thunk middleware

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

/* Sub-page: boss, talent, me, msg. Totally 4 pages.*/
ReactDom.hydrate(
  (<Provider store={store}>
		<BrowserRouter>
      <App></App>
		</BrowserRouter>
	</Provider>),
  document.getElementById('root')
)
//Add gun pass to the App component as parameter
