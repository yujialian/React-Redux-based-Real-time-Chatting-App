import React from 'react'
import {
  connect
} from 'react-redux'
import {
  Result,
  Icon,
  WhiteSpace,
  List
} from 'antd-mobile';
@connect(
  state => state.user
)
class User extends React.Component {
  render() {
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
          <List.Item>Logout</List.Item>
        </List>
      </div>
    ) : null

  }
}
export default User
