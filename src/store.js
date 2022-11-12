import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authUpdate'

export default configureStore({
  reducer: {
    auth: authReducer
  },
})
