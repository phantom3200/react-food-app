import React from 'react'
import './App.css'
import { Pizza } from './models'
import { PizzaItem } from './components'
import { useAppDispatch, useAppSelector } from './hooks'
import { fetchPizzas, addPizza, removePizza, updatePizza } from './store'
import { generateNewId } from './helpers'

function App() {
  const { pizzasList, error, isLoading } = useAppSelector(
    (state) => state.pizzaReducer,
  )
  const dispatch = useAppDispatch()

  const handleGetPizzas = () => {
    dispatch(fetchPizzas())
  }

  const handleAddPizza = () => {
    const title = prompt()
    const newID = generateNewId(pizzasList)

    if (title && newID) {
      const data: Pizza = {
        id: newID,
        name: title,
        imageLink: '',
      }

      dispatch(addPizza(data))
        .unwrap()
        .then(() => dispatch(fetchPizzas()))
    }
  }

  const handleDeletePizza = (pizza: Pizza) => {
    dispatch(removePizza(pizza))
      .unwrap()
      .then(() => dispatch(fetchPizzas()))
  }

  const handleEditPizza = (pizza: Pizza) => {
    dispatch(updatePizza(pizza))
      .unwrap()
      .then(() => dispatch(fetchPizzas()))
  }

  return (
    <div className="App">
      <button onClick={handleGetPizzas}>Get Pizzas</button>
      <button onClick={handleAddPizza}> Add Pizza</button>
      {isLoading && <div>Идет загрузка...</div>}
      {error && <div>Ошибка</div>}
      <ul>
        {pizzasList &&
          pizzasList.map((pizza) => (
            <PizzaItem
              pizza={pizza}
              removePizza={handleDeletePizza}
              editPizza={handleEditPizza}
              key={pizza.id}
            />
          ))}
      </ul>
    </div>
  )
}

export default App
