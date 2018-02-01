import React from 'react'
import axios from 'axios'
import {
  withRouter
} from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
/*User as get user info to decide how to do routing.*/
@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component {
  //Get auth-information from back-end, then decide how to do routing.
  componentDidMount() {
    /*If already on the login/register page, no action needed.*/
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname) > -1) {
      return null
    }
    /*Get user info.Return user current information*/

    axios.get('user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            //Have login information
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
           }

        }
      }) //.then() is actually a Promise object,  can return current request's return value.

    /*1.Login or not?
    2.Current url address, if already in login page, then do not need do routing.
    3.User's identity, recuriter or talent? boss: talent list. talent: boss list.
    4.Whether user complete the profile's information or not. (Headshot, intro), if not complete
    re-route to the personal-information page to do further completion.
    */
  }
  render() {
    return null
  }
}
export default AuthRoute
