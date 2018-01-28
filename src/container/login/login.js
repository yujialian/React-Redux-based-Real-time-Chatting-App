import React from 'react'
import Logo from '../../component/logo/logo'
import{Redirect} from 'react-router-dom'
import hof_form from '../../component/hof_form/hof_form'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {
  connect
} from 'react-redux'
import {
  login
} from '../../redux/user.redux'

@connect(
  state => state.user, //Only use user's fields.
  {
    login
  }
)
@hof_form
class Login extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
    this.register = this.register.bind(this) //Only bind once, but some special cases using arrow function is better
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register') //Munipulate url, Jump to the register page.
  }
  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }
  handleLogin() {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem
              onChange={v=>this.props.handleChange('user',v)}
              >User</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v=>this.props.handleChange('pwd',v)}
              type='password'
              >Password</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type='primary'>
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
