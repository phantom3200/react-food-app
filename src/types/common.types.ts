import { rootReducer, setupStore } from '../store'
import { AsyncThunk } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
