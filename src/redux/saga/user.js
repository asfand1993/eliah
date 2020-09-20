import { take, put, call, spawn, all } from 'redux-saga/effects'
import { loadDataSuccess, userInfo } from '../actions/userActions'
import { registerUser, loginUser } from '../../lib/services'
import { USER } from '../variables'

function * onRegisterUser (action) {
  try {
    const { data } = action
    const response = yield call(registerUser, data)
    yield put(userInfo(data))
    yield put(loadDataSuccess(response))
  } catch (error) {
    yield put(userError(error.message))
  }
}

function * onLoginUser (action) {
  try {
    const { data } = action
    const response = yield call(loginUser, data)
    yield put(userInfo(data))
    yield put(loadDataSuccess(response))
  } catch (error) {
    yield put(userError(error.message))
  }
}

export function * registerUserWatcher () {
  while (true) {
    const action = yield take(USER.REGISTER_USER)
    yield spawn(onRegisterUser, action)
  }
}

export function * loginUserWatcher () {
  while (true) {
    const action = yield take(USER.LOGIN_USER)
    yield spawn(onLoginUser, action)
  }
}
