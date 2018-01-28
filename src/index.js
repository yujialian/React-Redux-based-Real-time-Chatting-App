//New store
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import reducers from './reducer'//Combine reducers modules into one reducer
import Login from './container/login/login'
import AuthRoute from './component/auth_route/auth_route'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import TalentInfo from './container/talentinfo/talentinfo'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
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

/* Sub-page: boss, talent, me, msg. Totally 4 pages.*/
ReactDom.render(
  (<Provider store={store}>
		<BrowserRouter>
			{/*only render the very first route*/}
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          /*Switch means once one route satisfied, the below router will be ignored.*/
          <Route path='/bossinfo' component={BossInfo}></Route>
          {/*<Route path='/boss' component={Boss}></Route>*/}
          <Route path='/talentinfo' component={TalentInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>

		</BrowserRouter>
	</Provider>),
  document.getElementById('root')
)
//Add gun pass to the App component as parameter
