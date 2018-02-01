import React from 'react'
import PropTypes from 'prop-types'
import {Card,WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userList.map(v=>(
          v.avatar?(
          <Card
            style={{zIndex:1}}
            onClick={()=>this.handleClick(v)}
            key={v._id}>
            {/*Header: Avatar and job title. Body:User introduction.*/}
            <Card.Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}>
            </Card.Header>
            <Card.Body>
              {v.type==='boss'?<div>Company: {v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type==='boss'?<div>Compensation: {v.money}</div>:null}
            </Card.Body>
          </Card>
        ):null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard
