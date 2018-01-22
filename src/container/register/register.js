import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
    /*Using bind is better in terms of performance. If we use arrow function which is better
    in the sense of coding style, also can desinate different parameters, using bind can not
    have desinate parameters.*/

  }
  handleChange(key,val) {
    this.setState({
      [key]:val//If don't add [], will treat key as a string.
    })
  }
  handleRegister() {
    console.log(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <h2>Register page</h2>
        <List>
          <InputItem placeholder="Please enter username"
            onChange = {v=>this.handleChange('user',v)}>Username</InputItem>
          <WhiteSpace />
          <InputItem placeholder="Please enter password"
            type="password"
            onChange = {v=>this.handleChange('pwd',v)}>Password</InputItem>
          <WhiteSpace />
          <InputItem
            placeholder="Please confirm password"
            type="password"
            onChange = {v=>this.handleChange('repeatpwd',v)}>
            Confirm
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type=='genius'}
            onChange = {()=>this.handleChange('type','genius')}>
            Talent
          </RadioItem>
          <RadioItem
            checked={this.state.type=='boss'}
            onChange = {()=>this.handleChange('type','boss')}>
            Recruiter
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>Register</Button>
          <WhiteSpace />
        </List>
      </div>
    )
  }
}
export default Register
