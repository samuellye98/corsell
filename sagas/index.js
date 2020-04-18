import { all } from 'redux-saga/effects'
import loginSaga from './loginSaga'
import signupSaga from './signupSaga'
import uploadSaga from './uploadSaga'

function * rootSaga () {
  yield all([...loginSaga, ...signupSaga, ...uploadSaga])
}

export default rootSaga
