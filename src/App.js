import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync} from './index.redux'
class App extends React.Component {
	render() {
		//const store = this.props.store
		//const num = store.getState()//get data from redux
		return (
			<div>
				<h1>We have {this.props.num} guns right now</h1>
				<button onClick={this.props.addGun}>Get weapon</button>
				<button onClick={this.props.removeGun}>Give weapon</button>
				<button onClick={this.props.addGunAsync}>Get weapon after 2 days</button>
			</div>
			)
	}
}
const mapStatetoProps = (state)=>{//将state放在属性(props)中
	console.log({num:state})
	return {num:state}
}
const actionCreators = { addGun, removeGun, addGunAsync}
App = connect(mapStatetoProps,actionCreators)(App)//自动将参数放到props中
export default App