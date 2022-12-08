import { configureStore, combineReducers, } from '@reduxjs/toolkit'
import authReducer from './features/authUpdate'
import testReducer from './features/testUpdate'
import storage from 'redux-persist/lib/storage' 
import { persistStore, persistReducer } from 'redux-persist'


const reducer:any = {
  reducer: {
    auth: authReducer,
    test: testReducer
  },
}

const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({
  auth: persistReducer<any, any>(persistConfig, authReducer),
  test:testReducer
})


const store = configureStore({
  reducer:rootReducer
})

const persistor = persistStore(store)
export {store, persistor}
