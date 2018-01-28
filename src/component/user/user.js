import React from 'react'
import {
  connect
} from 'react-redux'
import {
  Result,
  Icon,
  WhiteSpace,
  List,
  Modal
} from 'antd-mobile';
import browserCoolie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert('Logout Talent Hunter', 'Are you sure?', [
  { text: 'Cancel', onPress: () => console.log('cancel') },
  { text: 'Ok', onPress: () => {
    browserCoolie.erase('userid')
    this.props.logoutSubmit()
  } },])

  }
  render() {
    console.log(this.props)
    return this.props.user ? (
      <div>
          <Result
            img={<img src={require(`../img/${this.props.avatar}.png`)} style={{"width":"50px"}} alt="" />}
            title={this.props.user}
            message={this.props.type=='boss'?this.props.company:null}
           />

        <List renderHeader={()=>'Introduction'}>
          <List.Item
            multipleLine
            >
            {this.props.title}
            {this.props.desc.split('\n').map(v=><List.Item.Brief key={v}>{v}</List.Item.Brief>)}
            {this.props.money?<List.Item.Brief>Compensation:{this.props.money}</List.Item.Brief>:null}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <List.Item onClick={this.logout}>Logout</List.Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}/>

  }
}
export default User
