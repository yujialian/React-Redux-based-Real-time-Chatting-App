import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')//Connect client with backend Websocket
//Get chat list
const MSG_LIST = 'MSG_LIST'
//Read Message
const MSG_RECV = 'MSG_RECV'
// Mark Readed
const MSG_READ = 'MSG_READ'
const initState = {
  chatmsg:[],
  users:{},
  unread:0
}
export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
    case MSG_RECV:
      const un_read = action.payload.to == action.userid?1:0
      return {...state, chatmsg:[...state.chatmsg, action.payload],unread:state.unread+un_read}
    default:
      return state
  }
}
function msgList(msgs, users,userid) {
  return {type:MSG_LIST, payload:{msgs,users,userid}}
}
export function sendMsg({from, to, msg}) {//Action creater must return an object or function
  return dispatch=>{
    socket.emit('sendmsg',{from, to, msg})
  }
}
function msgRecv(msg,userid) {//Receive the data, dispatch to redux
  return {userid, type:MSG_RECV, payload:msg}
}
export function recvMsg() {
  return (dispatch, getState)=>{
    socket.on('recvmsg',function(data) {
      console.log("getState(): ", getState())
      const userid = getState().user._id
      dispatch(msgRecv(data,userid))
    })
  }
}
export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
        if(res.status==200 && res.data.code==0) {
          //console.log('getState:   ', getState())
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users,userid))
        }
      })
  }
}
