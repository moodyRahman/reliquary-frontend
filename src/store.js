import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authUpdate'
import testReducer from './features/test/testUpdate'

export default configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer
  },
})
