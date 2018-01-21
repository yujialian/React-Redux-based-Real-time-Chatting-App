import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this) //Only bind once, but some special cases using arrow function is better
  }
  register() {
    this.props.history.push('/register')//Munipulate url, Jump to the register page.
  }
  render() {
    return (
      <div>
        <Logo></Logo>
        <h2>I am login page.</h2>
        <WingBlank>
          <List>
            <InputItem>User</InputItem>
            <WhiteSpace />
            <InputItem>Password</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary'>
            Login
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>
            Register
          </Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login
