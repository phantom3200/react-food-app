import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUrl, logoutUrl, refreshUrl, registrationUrl } from '../constants'
import { AuthResponse, AuthData, RootState } from '../models'
import { $api } from '../helpers'
import axios from 'axios'

export const register = createAsyncThunk(
  'auth/register',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        authReducer: { login, password },
      } = getState() as RootState
      const data: AuthData = {
        email: login,
        password,
      }
      const response = await $api.post<AuthResponse>(`${registrationUrl}`, data)

      return response.data
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        authReducer: { login, password },
      } = getState() as RootState
      const data: AuthData = {
        email: login,
        password,
      }
      const response = await $api.post<AuthResponse>(`${loginUrl}`, data)

      return response.data
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    const response = await $api.post<void>(`${logoutUrl}`)

    return response.data
  } catch (e) {
    return thunkApi.rejectWithValue((e as Error).message)
  }
})

export const checkAuth = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<AuthResponse>(`${refreshUrl}`, {
        withCredentials: true,
      })

      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue((e as Error).message)
    }
  },
)
