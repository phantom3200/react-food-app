import { AuthResponse, User } from '../../models'
import { defaultUser } from '../../constants'
import {
  createAction,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit'
import { checkAuth, loginUser, logout, register } from '../../services'

export type AuthState = {
  user: User
  isAuth: boolean
  isLoading: boolean
  error: string
  login: string
  password: string
}

export const initialUserState: AuthState = {
  user: defaultUser,
  isAuth: false,
  isLoading: false,
  error: '',
  login: '',
  password: '',
}

const setUserAction = createAction<User>('auth/setUser')
const setAuthAction = createAction<boolean>('auth/setAuth')
const setLoginAction = createAction<string>('auth/setLogin')
const setPasswordAction = createAction<string>('auth/setPassword')

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state: AuthState) => {
        localStorage.removeItem('token')
        authSlice.caseReducers.setAuth(state, setAuthAction(false))
        authSlice.caseReducers.setUser(state, setUserAction(defaultUser))
      })
      .addMatcher(
        isAnyOf(register.fulfilled, loginUser.fulfilled, checkAuth.fulfilled),
        (state: AuthState, action: PayloadAction<AuthResponse>) => {
          const { accessToken, user } = action.payload

          localStorage.setItem('token', accessToken)
          authSlice.caseReducers.setAuth(state, setAuthAction(true))
          authSlice.caseReducers.setUser(state, setUserAction(user))
          authSlice.caseReducers.setLogin(state, setLoginAction(''))
          authSlice.caseReducers.setPassword(state, setPasswordAction(''))
        },
      )
      .addMatcher(
        isAnyOf(
          register.pending,
          loginUser.pending,
          logout.pending,
          checkAuth.pending,
        ),
        (state: AuthState) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          loginUser.rejected,
          logout.rejected,
          checkAuth.rejected,
        ),
        (state: AuthState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
  },
})

export default authSlice.reducer
