import React from 'react'
import {
  Grid,
  List
} from 'antd-mobile';
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    /*Define Avatar List*/
    const avatarList = 'boy,man,woman,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))
      /*End of define Avatar List*/

      /*Check if avatar already been selected.*/
    const gridHeader = this.state.text ?
      (<div>
                        <span>Selected avatar</span>
                        <img style={{width:20}} src={this.state.icon} alt="" />
                      </div>) :
      'Please pick your avatar'
      /*End of checking.*/

    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avatarList}
            onClick={elm=>{
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
            columnNum={5} />
        </List>
      </div>
    )
  }
}
export default AvatarSelector
