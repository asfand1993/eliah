import { all } from 'redux-saga/effects'
import { registerUserWatcher, loginUserWatcher } from './user'

export default function * rootSaga () {
  try {
    yield all([registerUserWatcher(), loginUserWatcher()])
  } catch (err) {
    console.log(err)
  }
}
