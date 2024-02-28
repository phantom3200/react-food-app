import { Pizza } from './pizza'

export type PizzaResponse = {
  data: Pizza[]
}

export type RemovePizzaReq = {
  id: number
}
