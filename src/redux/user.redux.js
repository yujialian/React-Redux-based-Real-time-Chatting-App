import axios from 'axios'/*Promise, return current request's return value.*/
import {
  getRedirectPath
} from '../util'
/*Put action, reducer, action creater. */
//Reducers
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
export function login({
  user,
  pwd
}) {
  if (!user || !pwd) {
    return errorMsg('Username or password is missing!')
  }
  return dispatch => {
    axios.post('/user/login', {
        user,
        pwd
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data)) //Data field pass by back-end
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
export function update(data) {
  return dispatch=>{
    axios.post('/user/update',data)//Send /update to user.js to find the router.
    .then(res=>{
      if(res.status===200&&res.data.code===0) {
        console.log('res:',res)
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return { ...state,
        msg: action.msg,
      }
    default:
      return state
  }
  return state
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

export function loadData(userinfo) {
  return { type:LOAD_DATA, payload:userinfo }
}

function authSuccess(obj) {
  const {pwd,...data} = obj //Get ride of pwd.
  return {
    type:AUTH_SUCCESS,
    payload:data
  }
}

export function register({
  user,
  pwd,
  repeatpwd,
  type
}) {
  if (!user || !pwd || !type) {
    return errorMsg('You must fill out username, password and account type!')
  }
  if (pwd !== repeatpwd) {
    return errorMsg("Password and confirm password not match!")
  }
  //asynchronously,return a function with dispatch as parameter
  return dispatch => {
    axios.post('/user/register', {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({
            user,
            pwd,
            type
          }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
