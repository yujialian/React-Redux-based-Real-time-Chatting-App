import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
@connect (
  state => state.chatuser,
  {getUserList}//action
)
class Talent extends React.Component {

  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    //console.log(this.state)
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}
export default Talent
