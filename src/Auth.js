import React from 'react'
import {
  connect
} from 'react-redux'
import {
  login,
  getUserData
} from './Auth.redux'
import {
  Redirect
} from 'react-router-dom'
import axios from 'axios'
//Two reducers, 页面一个，auth一个
//合并reducer
@connect(
  state => state.auth,
  {
    login, getUserData
  }
)
class Auth extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUserData()
    // axios.get('/data')
    //   .then(res => {
    //     if (res.status === 200) {
    //       this.setState({
    //         data: res.data
    //       })
    //     }
    //   })
  }
  render() {
    return (
      <div>
      <h2>My name is: {this.props.user}, age: {this.props.age}</h2>
        { this.props.isAuth ? <Redirect to='/dashboard' />: null }
        <h2>Please login first.</h2>
        <button onClick={this.props.login}>Login</button>
      </div>
    )
  }
}
export default Auth
