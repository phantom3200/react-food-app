import { Pizza } from '../../models'

export type PizzaItemProps = {
  pizza: Pizza
  removePizza: (_id: number) => void
  editPizza: (pizza: Pizza) => void
}
