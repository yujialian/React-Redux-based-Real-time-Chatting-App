import axios from 'axios'
/*Put action, reducer, action creater. */
//Reducers
const initState={
  msg:'',
  isAuth:false,
  user:'',
  pwd:'',
  type:''
}
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg:'',isAuth:true,...action.payload}
    case ERROR_MSG:
      return {...state, msg:action.msg, isAuth:false}
    default:
      return state
  }
  return state
}
function errorMsg(msg) {
  return {msg, type:ERROR_MSG}
}
function registerSuccess(data) {
  return {type:REGISTER_SUCCESS, payload:data}
}
export function register({user, pwd, repeatpwd, type}) {
  if(!user||!pwd||!type) {
    return errorMsg('You must fill out username, password and account type!')
  }
  if(pwd != repeatpwd) {
    return errorMsg("Password and confirm password not match!")
  }
  //asynchronously,return a function with dispatch as parameter
  return dispatch=>{
    axios.post('/user/register', {user, pwd, type})
      .then(res=>{
        if(res.status==200 && res.data.code==0) {
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
