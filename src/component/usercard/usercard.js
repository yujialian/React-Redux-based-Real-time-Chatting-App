import React from 'react'
import PropTypes from 'prop-types'
import {Card,WhiteSpace, WingBlank} from 'antd-mobile'

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v=>(
          v.avatar?(
          <Card key={v.id}>
            {/*Header: Avatar and job title. Body:User introduction.*/}
            <Card.Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}>
            </Card.Header>
            <Card.Body>
              {v.type=='boss'?<div>Company: {v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type=='boss'?<div>Compensation: {v.money}</div>:null}
            </Card.Body>

          </Card>
        ):null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard
