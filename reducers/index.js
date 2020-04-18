import { combineReducers } from 'redux'

import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import uploadReducer from './uploadReducer'

export default combineReducers({
  signupReducer,
  loginReducer,
  uploadReducer
})
