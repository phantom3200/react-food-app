import { User } from '../models'

export const defaultUserId = 0

export const defaultUser: User = {
  id: defaultUserId,
  email: '',
  isActivated: false,
  isAdmin: false,
}
