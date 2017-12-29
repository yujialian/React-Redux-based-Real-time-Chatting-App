
const ADD_GUN = 'Add gun'
const REMOVE_GUN = 'Deduce gun'

//Reducer
export function counter(state=0, action) {
	switch(action.type) {
		case ADD_GUN:
			return state+1
		case REMOVE_GUN:
			return state-1
		default:
			return 10
	}
}

//Action creater
export function addGun() {
	return {type:ADD_GUN}
}
export function removeGun() {
	return {type:REMOVE_GUN}
}
export function addGunAsync() {
	return dispatch=> { //the outer arrow function has one parameter 'dispatch'
		setTimeout(()=>{
			dispatch({type:ADD_GUN})//延迟两秒将add gun给dispatch
		},2000)
	}
}
