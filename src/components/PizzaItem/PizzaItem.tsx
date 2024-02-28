import { FC, MouseEvent } from 'react'
import { PizzaItemProps } from './PizzaItem.types'
import { getImgUrl } from '../../helpers'

const PizzaItem: FC<PizzaItemProps> = ({ pizza, removePizza, editPizza }) => {
  const handleEdit = () => {
    const name = prompt() || ''

    if (name) {
      editPizza({ ...pizza, name })
    }
  }

  const handleRemove = (event: MouseEvent) => {
    event.stopPropagation()
    removePizza(pizza._id)
  }

  return (
    <li>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleRemove}>Remove</button>
      <div>{pizza.name}</div>
      <img
        style={{ width: '200px' }}
        src={getImgUrl(pizza.fileName)}
        alt={pizza.name}
      />
    </li>
  )
}

export default PizzaItem
