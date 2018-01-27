import axios from 'axios'
const USER_LIST = 'USER_LIST'
const initState = {
  userList:[]
}
/*Reducer*/
export function chatuser(state=initState, action) {
  switch(action.type) {
    case USER_LIST:
      console.log('...state: ',{...state})
      console.log('{userList:action.payload}: ',{userList:action.payload})
      console.log('{...state, userList:action.payload}: ',{...state, userList:action.payload})
      console.log('...state: ',{...state})
      return {...state, userList:action.payload}/*Put action.payload into user list.*/
    default:
      return state
  }
}
function userList(data) {
  return {type: USER_LIST, payload: data}
}
export function getUserList(type) {
  return dispatch=>{
    axios.get('/user/list?type='+type)
      .then(res => {
        if (res.data.code === 0) {
          dispatch(userList(res.data.data))
        }
      })
  }
}
