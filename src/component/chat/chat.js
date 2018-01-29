import React from 'react'
import {List, InputItem, NavBar} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
const socket = io('ws://localhost:9093')//Connect client with backend Websocket
@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text:'',msg:[]}
  }
  componentDidMount() {
    this.props.getMsgList(),
    this.props.recvMsg()//Once get into the app, recvMsg starts.
  }
  handleSubmit() {
    //socket.emit('sendmsg', {text:this.state.text})
    //this.setState({text:''})
    const from = this.props.user._id
    console.log(from)
    const to = this.props.match.params.user//In the url
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
  render() {
    //console.log("Current props(redux): ",this.props)
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id="chat-page">
        <NavBar mode='dark' >
          {this.props.match.params.user}
        </NavBar>

        {this.props.chat.chatmsg.map(v=>{
          return v.from==user?(
            <List key={v._id}>
              <Item>
                {/*thumb={}>*/}
                {v.content}
              </Item>
            </List>
          ):(
            <List key={v._id}>
              <Item
                extra={'avatar'}
                className='chat-me'>
                {v.content}
              </Item>
            </List>
          )
        })}
      <div className='stick-footer'>
        <List>
          <InputItem
            placeholder="Say something to your friend."
            value={this.state.text}
            onChange={v=>{
              this.setState({text:v})
            }}
            extra={<span onClick={()=>this.handleSubmit()}>Send</span>}
            >Message</InputItem>
        </List>
      </div>
      </div>
    )
  }
}
export default Chat
