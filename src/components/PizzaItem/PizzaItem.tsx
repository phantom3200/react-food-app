import { FC, MouseEvent } from 'react'
import { PizzaItemProps } from './PizzaItem.types'

const PizzaItem: FC<PizzaItemProps> = ({ pizza, removePizza, editPizza }) => {
  const handleEdit = () => {
    const name = prompt() || ''

    if (name) {
      editPizza({ ...pizza, name })
    }
  }

  const handleRemove = (event: MouseEvent) => {
    event.stopPropagation()
    removePizza(pizza)
  }

  return (
    <li>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleRemove}>Remove</button>
      <div>{pizza.name}</div>
      <img style={{ width: '200px' }} src={pizza.imageLink} alt={pizza.name} />
    </li>
  )
}

export default PizzaItem
