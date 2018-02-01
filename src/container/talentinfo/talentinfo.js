import React from 'react'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile';
import AvatarSelector from '../../component/avatar_selector/avatar_selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {update}
)
class TalentInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      title:'',
      desc:'',
      company:''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]:val
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo} />:null}
        <NavBar mode="dark">Talent center</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.setState({
              avatar:imgname
            })
          }}
          ></AvatarSelector>
        <InputItem
          onChange={(v)=>this.onChange('title',v)}>
          Job Type
        </InputItem>

        <TextareaItem
          rows={3}
          autoHeight
          labelNumber={6}
          title="Introduction"
          onChange={(v)=>this.onChange('desc',v)} />
        <Button
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'>Save</Button>
      </div>
    )
  }
}
export default TalentInfo
