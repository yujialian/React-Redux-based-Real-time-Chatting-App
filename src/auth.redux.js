const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export function auth(state={isAuth:false, user:'Yunlong Li'}, action) {//Reducer
  
  switch(action.type) {
    case LOGIN:
      return {...state, isAuth:true}//If login, set the isAuth to true in state.
    case LOGOUT:
      return {...state, isAuth:false}//If logout, set the isAuth to false in state.
    default:
      return state  //If no match, return default setting: user:'Yunlong Li'
  }
}
//Action creater
export function login() {
  return {type:LOGIN}
}
export function logout() {
  return {type:LOGOUT}
}
