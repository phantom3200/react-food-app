import { AnyAction } from 'redux'
import { Pizza } from '../models'

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
  const lastID = pizzas.at(-1)?.id

  return lastID ? lastID + 1 : null
}
