import React from 'react'
import {
  connect
} from 'react-redux'
import {
  NavBar
} from 'antd-mobile'
import {
  Route,
  Redirect
} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Talent from '../../component/genius/genius'
import User from '../../component/user/user'
import {
  getMsgList,
  recvMsg
} from '../../redux/chat.redux'
import Msg from '../../component/message/message'
import QueueAnim from 'rc-queue-anim'
@connect(
  state => state, {
    getMsgList,
    recvMsg
  }
)
class DashBoard extends React.Component {
  componentDidMount() {
    //console.log(this.props.location.pathname)
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      if(this.props.location.pathname.indexOf("/chat") === -1) {
        this.props.recvMsg() //Once get into the app, recvMsg starts.
      }
      }
    }
  render() {
    const {
      pathname
    } = this.props.location
    const user = this.props.user //Get from redux
    const navList = [{
        path: '/boss',
        text: 'Recruter',
        icon: 'boss',
        title: 'Talent List',
        component: Boss, //The component that need to be rendered.
        hide: user.type === "genius"
      },
      {
        path: '/talent',
        text: 'Talent',
        icon: 'job',
        title: 'Boss List',
        component: Talent, //The component that need to be rendered.
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'msg',
        title: 'Message List',
        component: Msg, //The component that need to be rendered.
      },
      {
        path: '/me',
        text: 'Me',
        icon: 'user',
        title: 'User center',
        component: User, //The component that need to be rendered.
      }
    ]
    const page = navList.find(v => v.path === pathname)
    //in order to have animation effect, only render 1 router, decide component based on current path.
    return page?(
      <div>
        <NavBar className='fixed-header' mode='dard'>{page.title}</NavBar>
        <div style={{marginTop:45}}>
          <QueueAnim type='scaleX' duration={1500}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    ):<Redirect to='/msg'></Redirect>
  }
}

export default DashBoard
