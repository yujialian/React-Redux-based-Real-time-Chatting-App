import React from 'react'
import { connect } from 'react-redux'
import { login } from './Auth.redux'
import {Redirect} from 'react-router-dom'
//Two reducers, 页面一个，auth一个
//合并reducer
@connect(
  state=>state.auth,
  {login}
)
class Auth extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        { this.props.isAuth ? <Redirect to='/dashboard' />: null }
        <h2>Please login first.</h2>
        <button onClick={this.props.login}>Login</button>
      </div>
    )
  }
}
export default Auth
