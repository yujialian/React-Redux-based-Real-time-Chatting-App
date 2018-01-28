import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {
  connect
} from 'react-redux'
import {
  register
} from '../../redux/user.redux'
import {
  Redirect
} from 'react-router-dom'
import hof_form from '../../component/hof_form/hof_form'
@connect(//Connect a React component to a redux store
  state => state.user, //Set the user's state and bind with current component's props
  {
    register
  }//Bind the register action on register component
)
@hof_form
class Register extends React.Component {
  constructor(props) {
    super(props)

    this.handleRegister = this.handleRegister.bind(this)
    /*Using bind is better in terms of performance. If we use arrow function which is better
    in the sense of coding style, also can desinate different parameters, using bind can not
    have desinate parameters.*/

  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val //If don't add [], will treat key as a string.
  //   })
  // }
  handleRegister() {
    this.props.register(this.props.state)
    //console.log(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem placeholder="Please enter username"
            onChange = {v=>this.props.handleChange('user',v)}>Username</InputItem>
          <WhiteSpace />
          <InputItem placeholder="Please enter password"
            type="password"
            onChange = {v=>this.props.handleChange('pwd',v)}>Password</InputItem>
          <WhiteSpace />
          <InputItem
            placeholder="Please confirm password"
            type="password"
            onChange = {v=>this.props.handleChange('repeatpwd',v)}>
            Confirm
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type==='genius'}
            onChange = {()=>this.props.handleChange('type','genius')}>
            Talent
          </RadioItem>
          <RadioItem
            checked={this.props.state.type==='boss'}
            onChange = {()=>this.props.handleChange('type','boss')}>
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
