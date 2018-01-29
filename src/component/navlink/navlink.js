import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter/*NavLinkBar is not a router component, so use withRouter to get the router related information.*/
@connect(
  state=>state.chat
)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const navList = this.props.data.filter(v=>!v.hide)/*Get ride of hide===true.*/
    const {pathname} = this.props.location
    return (
      <TabBar>
        {navList.map(v=>(
          <TabBar.Item
            badge={v.path=='/msg'?this.props.unread:''}
            key={v.path}
            title={v.text}
            icon={{uri: require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
            selected={pathname===v.path}
            onPress={()=>{
              this.props.history.push(v.path)
            }}
            >
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}
export default NavLinkBar
