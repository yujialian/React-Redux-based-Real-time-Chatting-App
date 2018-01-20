import axios from 'axios'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'
const initState = {
  isAuth:false,
  user:'Yunlong Li',
  age:20
}
export function auth(state=initState, action) {//Reducer
  console.log(state,action)
  switch(action.type) {
    case LOGIN:
      return {...state, isAuth:true}//If login, set the isAuth to true in state.
    case LOGOUT:
      return {...state, isAuth:false}//If logout, set the isAuth to false in state.
    case USER_DATA:
      return {...state, user:action.payload.user,age:action.payload.age}
    default:
      return state  //If no match, return default setting: user:'Yunlong Li'
  }
}
export function getUserData() {
  //Dispatch used as notify that data being modified.
  return dispatch=>{
    axios.get('/data')
      .then(res => {
        if (res.status === 200) {
          dispatch(userData(res.data))
        }
      })
  }
}
export function userData(data) {
  return {type: USER_DATA,payload:data}
}
//Action creater
export function login() {
  return {type:LOGIN}
}
export function logout() {
  return {type:LOGOUT}
}
