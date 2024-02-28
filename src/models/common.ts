import { AuthState, UsersState, PizzaState } from '../store'
import { AxiosError } from 'axios'

export type RootState = {
  authReducer: AuthState
  usersReducer: UsersState
  pizzaReducer: PizzaState
}

export type AxiosErrorResponse = AxiosError<{ message: string }>
