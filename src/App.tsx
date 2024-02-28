import React, { useEffect } from 'react'
import './App.css'
import { Pizza } from './models'
import { PizzaItem, LoginForm, AddPizzaForm } from './components'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  fetchPizzas,
  fetchUsers,
  removePizza,
  updatePizza,
  checkAuth,
} from './services'
import { generateNewId } from './helpers'

function App() {
  const { pizzasList, error, isLoading } = useAppSelector(
    (state) => state.pizzaReducer,
  )
  const {
    usersList,
    error: userError,
    isLoading: isUserLoading,
  } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  const handleGetPizzas = () => {
    dispatch(fetchPizzas())
  }

  const handleGetUsers = () => {
    dispatch(fetchUsers())
  }

  const handleAddPizza = () => {
    const title = prompt()
    const newID = generateNewId(pizzasList)

    if (title && newID) {
      const data: Pizza = {
        _id: newID,
        name: title,
        fileName: '',
      }

      /*dispatch(addPizza(data))
        .unwrap()
        .then(() => dispatch(fetchPizzas()))*/
    }
  }

  const handleDeletePizza = (id: number) => {
    dispatch(removePizza(id))
    /*.unwrap()
      .then(() => dispatch(fetchPizzas()))*/
  }

  const handleEditPizza = (pizza: Pizza) => {
    dispatch(updatePizza(pizza))
      .unwrap()
      .then(() => dispatch(fetchPizzas()))
  }

  return (
    <div className="App">
      <button onClick={handleGetUsers}>Get Users</button>
      <button onClick={handleGetPizzas}>Get Pizzas</button>
      <button onClick={handleAddPizza}> Add Pizza</button>
      <LoginForm />
      <AddPizzaForm />
      {isLoading && <div>Идет загрузка...</div>}
      {error && <div>{error}</div>}
      <ul>
        {pizzasList &&
          pizzasList.map((pizza) => (
            <PizzaItem
              pizza={pizza}
              removePizza={handleDeletePizza}
              editPizza={handleEditPizza}
              key={pizza._id}
            />
          ))}
      </ul>
      {isUserLoading && <div>Идет загрузка...</div>}
      {userError && <div>{userError}</div>}
      <ul>
        {usersList &&
          usersList.map((user) => <div key={user.id}>{user.email}</div>)}
      </ul>
    </div>
  )
}

export default App
