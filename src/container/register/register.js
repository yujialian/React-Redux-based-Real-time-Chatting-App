import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'genius'
    }
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <h2>Register page</h2>
        <List>
          <InputItem placeholder="Please enter username">Username</InputItem>
          <WhiteSpace />
          <InputItem placeholder="Please enter password">Password</InputItem>
          <WhiteSpace />
          <InputItem placeholder="Please confirm password">Confirm</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type=='genius'}>
            Talent
          </RadioItem>
          <RadioItem checked={this.state.type=='boss'}>
            Recruiter
          </RadioItem>
          <WhiteSpace />
          <Button type="primary">Register</Button>
          <WhiteSpace />
        </List>
      </div>
    )
  }
}
export default Register
