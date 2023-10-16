import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { pizzaReducer } from './reducers'
import { pizzaAPI } from '../services'

export const rootReducer = combineReducers({
  pizzaReducer,
  [pizzaAPI.reducerPath]: pizzaAPI.reducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pizzaAPI.middleware),
  })
