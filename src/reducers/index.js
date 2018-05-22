import { combineReducers } from 'redux'

import auth from './auth'
import user from './user'
import profile from './profile'

const rootReducer = combineReducers({
  auth,
  user,
  profiles: profile,
})

export default rootReducer
