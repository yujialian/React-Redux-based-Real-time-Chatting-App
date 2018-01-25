import axios from 'axios'/*Promise, return current request's return value.*/
import {
  getRedirectPath
} from '../util'
/*Put action, reducer, action creater. */
//Reducers
const initState = {
  redirectTo: '',
  msg: '',
  isAuth: false,
  user: '',
  type: ''
}
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

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
        if (res.status == 200 && res.data.code == 0) {
          dispatch(loginSuccess(res.data.data)) //Data field pass by back-end
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      }
    case LOGIN_SUCCESS:
      return { ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return { ...state,
        msg: action.msg,
        isAuth: false
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

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
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
  if (pwd != repeatpwd) {
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
        if (res.status == 200 && res.data.code == 0) {
          dispatch(registerSuccess({
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
