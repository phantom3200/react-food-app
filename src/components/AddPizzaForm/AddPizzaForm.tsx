import { ChangeEvent, FC, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { pizzaSlice } from '../../store'
import { addPizza } from '../../services'

const AddPizzaForm: FC = () => {
  const dispatch = useAppDispatch()
  const { newPizzaName, newPizzaImage } = useAppSelector(
    (state) => state.pizzaReducer,
  )
  const { setNewPizzaName, setNewPizzaImage } = pizzaSlice.actions

  const handlePizzaImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      dispatch(setNewPizzaImage(files[0]))
    }
  }

  const handlePizzaNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    dispatch(setNewPizzaName(value))
  }

  const handleAddPizza = () => {
    dispatch(addPizza())
  }

  return (
    <Fragment>
      <input
        type={'text'}
        value={newPizzaName}
        placeholder={'Name'}
        onChange={handlePizzaNameChange}
      />
      <input
        type={'file'}
        accept={'.jpg,.jpeg,.png,.webp'}
        placeholder={'Image'}
        onChange={handlePizzaImageChange}
      />
      <button onClick={handleAddPizza}>Add Pizza</button>
    </Fragment>
  )
}

export default AddPizzaForm
