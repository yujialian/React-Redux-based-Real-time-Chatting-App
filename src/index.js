//New store
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import reducers from './reducer'//合并两个模块
import Login from './container/login/login'
import AuthRoute from './component/auth_route/auth_route'
import Register from './container/register/register'
import './config'//Execute config.js
import './index.css'
import {
  Provider
} from 'react-redux'
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
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
function Boss() {
  return <h2>This is boss page.</h2>
}

ReactDom.render(
  (<Provider store={store}>
		<BrowserRouter>

			{/*only render the very first route*/}
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/boss' component={Boss}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>

		</BrowserRouter>
	</Provider>),
  document.getElementById('root')
)
//Add gun pass to the App component as parameter
