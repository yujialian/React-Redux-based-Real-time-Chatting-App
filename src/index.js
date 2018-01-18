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
import {
  counter
} from './index.redux'
import Auth from './Auth'
import Dashboard from './Dashboard'
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevtools
))
/* 使用了provider来代替render和subscribe
function render() {

	ReactDom.render(<App store={store} addGunAsync={addGunAsync} addGun={addGun} removeGun={removeGun} />,document.getElementById('root'))//Add gun pass to the App component as parameter
}
render()
store.subscribe(render)//状态改变(add/deduce gun)重新执行store(render)
*/

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return <h2>Test component {this.props.match.params.location}</h2>
  }
}

ReactDom.render(
  (<Provider store={store}>
		<BrowserRouter>
		<Switch>
			{/*只渲染命中的第一个Route*/}
			<Route exact path='/login' component={Auth}></Route>{/*First, show login page.*/}
			<Route path='/dashboard' component={Dashboard}></Route>{/*if login, redirect to dashboard*/}
			<Redirect to='/dashboard'></Redirect>{/*Otherwise, direct to dashboard.*/}
		</Switch>
		</BrowserRouter>
	</Provider>),
  document.getElementById('root')
)
//Add gun pass to the App component as parameter
