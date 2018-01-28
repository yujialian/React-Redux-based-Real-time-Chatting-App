import React from 'react'
import {List, InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')//Connect client with backend Websocket

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text:'',msg:[]}
  }
  componentDidMount() {
    socket.on('recvmsg', (data)=>{
      this.setState({
        msg:[...this.state.msg,data.text]
      })
    })
  }
  handleSubmit() {
    socket.emit('sendmsg', {text:this.state.text})
    this.setState({text:''})
  }
  render() {
    return (
      <div>
        {this.state.msg.map(v=>{
          return <p key={v}>{v}</p>
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
