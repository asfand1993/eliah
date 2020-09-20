import { USER } from '../variables'
// Register
export function loadDataSuccess (data) {
  return {
    type: USER.LOAD_DATA_SUCCESS,
    data
  }
}
// Action to call the saga function
export function loadData (data) {
  return { type: USER.REGISTER_USER, data }
}

// Action to save username and email
export function userInfo (data) {
  return { type: USER.USER_INFO, data }
}

// Action to change the value of register flag
export function userRegisterFlag (flag) {
  return { type: USER.REGISTER_USER_FLAG, flag }
}

// Action to save the error in api in user

export function userError (message) {
  return { type: USER.USER_ERROR, message }
}


export function loginUser (data) {
  return { type: USER.LOGIN_USER, data }
}