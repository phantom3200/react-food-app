import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { pizzaReducer, userReducer, authReducer } from './reducers'

export const rootReducer = combineReducers({
  pizzaReducer,
  userReducer,
  authReducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['pizzaReducer.newPizzaImage'],
          ignoredActions: ['pizza/setNewPizzaImage'],
        },
      }),
  })
