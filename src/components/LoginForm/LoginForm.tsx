import React, { ChangeEvent, FC, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { authSlice } from '../../store'
import { register, loginUser, logout } from '../../services'

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const { login, password, isAuth } = useAppSelector(
    (state) => state.authReducer,
  )
  const { setLogin, setPassword } = authSlice.actions

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    dispatch(setLogin(value))
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    dispatch(setPassword(value))
  }

  const handleRegister = () => {
    dispatch(register())
  }

  const handleLogin = () => {
    dispatch(loginUser())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      {isAuth ? (
        <Fragment>
          <h2>Вы авторизованы</h2>
          <button onClick={handleLogout}>Logout</button>
        </Fragment>
      ) : (
        <Fragment>
          <h2>Вы не авторизованы</h2>
          <input
            type={'email'}
            value={login}
            placeholder={'Email'}
            onChange={handleLoginChange}
          />
          <input
            type={'password'}
            value={password}
            placeholder={'Password'}
            onChange={handlePasswordChange}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </Fragment>
      )}
    </div>
  )
}

export default LoginForm
