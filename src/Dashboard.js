import React from 'react'
import {
  Link,
  Route,
	Redirect
} from 'react-router-dom'
import App from './App'
import { connect } from 'react-redux'
import { logout } from './Auth.redux'
function Erying() {
  return <h2>Second group</h2>
}

function Qibinglian() {
  return <h2>Ground army group</h2>
}

@connect(
	state=>state.auth,
	{logout}
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
		const match = this.props.match
		console.log(match)
		const redirectToLogin = <Redirect to='/login'></Redirect>
		const app = (

			<div>
				<h1>Independent is everything!</h1>
				{this.props.isAuth ? <button onClick={this.props.logout}>Logout</button> : null}
				<ul>
				 <li>
				<Link to={`${match.url}`}>一营</Link>
				 </li>
				<li>
				<Link to={`${match.url}/erying`}>二营</Link>
		 </li>
			<li>
			<Link to={`${match.url}/qibinglian`}>骑兵连</Link>
			</li>
		 </ul>
		 <Route path={`${match.url}`} exact component={App}></Route>
		 <Route path={`${match.url}/erying`} component={Erying}></Route>
		 <Route path={`${match.url}/qibinglian`} component={Qibinglian}></Route>
		</div>
		)
    return (
			this.props.isAuth?app:redirectToLogin
    )
  }
}
export default Dashboard
