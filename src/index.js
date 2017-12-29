//New store
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'//Use applymiddleware to start thunk middleware
import App from './App'
import { counter,addGun,removeGun,addGunAsync } from './index.redux'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f
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
ReactDom.render(
	(<Provider store={store}>
		<App />
	</Provider>),
	document.getElementById('root')
)//Add gun pass to the App component as parameter
