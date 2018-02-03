/*This component share by front and back end*/
import React from 'react'

import Login from './container/login/login'
import AuthRoute from './component/auth_route/auth_route'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import TalentInfo from './container/talentinfo/talentinfo'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import {
  Route,
  Switch
} from 'react-router-dom'
class App extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      hasError:false
    }
  }
  componentDidCatch(err,info) {
    this.setState({
      hasError:true
    })
  }
  render() {
    /*only render the very first route*/
    return this.state.hasError
    ?<h2>Page Not Found!</h2>
    :(
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          {/*Switch means once one route satisfied, the below router will be ignored.*/}
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/talentinfo' component={TalentInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/user/chat/:user' component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    )
  }
}
export default App
