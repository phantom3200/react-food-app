import axios from 'axios'
import { Pizza } from '../../models'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { pizzasBaseUrl } from '../../constants'

/*export const fetchPizzas = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(pizzaSlice.actions.pizzasFetching)
        const response = await axios.get<Pizza[]>('http://localhost:4000/pizzas')
        dispatch(pizzaSlice.actions.pizzasFetchingSuccess(response.data))
    } catch (e) {
        dispatch(pizzaSlice.actions.pizzasFetchingError((e as Error).message))
    }
}*/

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchAll',
  async (limit: number | void = 100, thunkApi) => {
    try {
      const response = await axios.get<Pizza[]>(`${pizzasBaseUrl}`, {
        params: {
          _limit: limit,
        },
      })

      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue((e as Error).message)
    }
  },
)

export const addPizza = createAsyncThunk(
  'pizza/add',
  async (data: Pizza, thunkApi) => {
    try {
      await axios.post<Pizza, Pizza>(`${pizzasBaseUrl}`, data)
    } catch (e) {
      return thunkApi.rejectWithValue((e as Error).message)
    }
  },
)

export const removePizza = createAsyncThunk(
  'pizza/remove',
  async (data: Pizza, thunkApi) => {
    try {
      await axios.delete<Pizza, Pizza>(`${pizzasBaseUrl}${data.id}`)
    } catch (e) {
      return thunkApi.rejectWithValue((e as Error).message)
    }
  },
)

export const updatePizza = createAsyncThunk(
  'pizza/update',
  async (data: Pizza, thunkApi) => {
    try {
      await axios.put<Pizza, Pizza>(`${pizzasBaseUrl}${data.id}`, data)
    } catch (e) {
      return thunkApi.rejectWithValue((e as Error).message)
    }
  },
)
