import React from 'react'
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid
} from 'antd-mobile'
import io from 'socket.io-client'
import {
  connect
} from 'react-redux'
import {
  getMsgList,
  sendMsg,
  recvMsg,
} from '../../redux/chat.redux'
import {
  getChatId
} from '../../util'
const socket = io('ws://localhost:9093') //Connect client with backend Websocket

@connect(
  state => state,
  {
    getMsgList,
    sendMsg,
    recvMsg,
  }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg() //Once get into the app, recvMsg starts.
    }

  }
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user //In the url
    const msg = this.state.text
    this.props.sendMsg({
      from,
      to,
      msg
    })
    this.setState({
      text: '',
      showEmoji:false
    })
  }
  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
                .split(' ')
                .filter(v=>v)
                .map(v=>({text:v}))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)
    return (
      <div id="chat-page">
        <NavBar
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
          icon={<Icon type="left" />}
          mode='dark' >
          {users[userid].name}
        </NavBar>
        {
          chatmsgs.map(v=>{
          const avatar = users[v.from]?require(`../img/${users[v.from].avatar}.png`):''
          return v.from==userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}>
                {v.content}
              </Item>
            </List>
          ):(
            <List key={v._id}>
              <Item
                extra={<img src={avatar} />}
                className='chat-me'>
                {v.content}
              </Item>
            </List>
          )
        })}
      <div className='stick-footer'>
        <List>
          <InputItem
            placeholder="Say something..."
            value={this.state.text}
            onChange={v=>{
              this.setState({text:v})
            }}
            extra={
              <div>
                <span
                  onClick={()=>{
                    this.setState({showEmoji:!this.state.showEmoji
                    })
                    this.fixCarousel()
                  }}
                  style={{marginRight:15}}
                  >😀</span>
                <span onClick={()=>this.handleSubmit()}>Send</span>
              </div>
            }
            >Message</InputItem>
        </List>
        {this.state.showEmoji?
          <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({
                text:this.state.text+el.text
              })
            }}
           />
          :null}

      </div>
      </div>
    )
  }
}
export default Chat
