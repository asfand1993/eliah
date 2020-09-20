import merge from 'lodash/merge'
import { USER } from '../variables'

const userReducer = (state = { userRegister: false }, action) => {
  switch (action.type) {
    case USER.SET_USER_TOKEN:
      return {
        ...(state || {}),
        id: action.userId,
        receivedAt: null
      }
    case USER.REGISTER_USER_FLAG:
      return {
        ...(state || {}),
        userRegister: action.flag
      }
    case USER.USER_SIGN_OUT:
      return null
    case USER.USER_INFO:
      const { password, ...rest } = action.data
      return merge({}, state || {}, rest)
    case USER.LOAD_DATA_SUCCESS:
      const { data } = action
      return merge({}, state || {}, { ...data, userRegister: true })
    default:
      return state
  }
}

export default userReducer
