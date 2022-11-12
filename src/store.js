import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authUpdate'
import testUpdate from './features/test/testUpdate'

export default configureStore({
  reducer: {
    auth: authReducer,
    test: testUpdate
  },
})
