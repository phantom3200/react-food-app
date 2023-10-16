import { Pizza } from '../../models'

export type PizzaItemProps = {
  pizza: Pizza
  removePizza: (pizza: Pizza) => void
  editPizza: (pizza: Pizza) => void
}
