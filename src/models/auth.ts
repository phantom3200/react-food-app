import { User } from './user'

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type AuthData = {
  email: string
  password: string
}
