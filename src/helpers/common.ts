import { AnyAction } from 'redux'
import { Pizza } from '../models'
import { apiUrl } from '../constants'

export const isRejectedAction = (action: AnyAction) => {
  return action.type.endsWith('rejected')
}

export const isPendingAction = (action: AnyAction) => {
  return action.type.endsWith('pending')
}

export const isFulfilledAction = (action: AnyAction) => {
  return action.type.endsWith('fulfilled')
}

export const generateNewId = (pizzas: Pizza[]): number | null => {
  const lastID = pizzas.at(-1)?._id

  return lastID ? lastID + 1 : null
}

export const getImgUrl = (name: string) => `${apiUrl}/${name}`
