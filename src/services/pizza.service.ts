import axios, { AxiosResponse } from 'axios'
import {
  AxiosErrorResponse,
  Pizza,
  PizzaResponse,
  RemovePizzaReq,
  RootState,
} from '../models'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { addPizzaUrl, pizzasBaseUrl, removePizzaUrl } from '../constants'

//TODO: вызывать fetchPizzas прямо в экшенах вместо компонента https://stackoverflow.com/questions/63516716/redux-toolkit-is-it-possible-to-dispatch-other-actions-from-the-same-slice-in-o
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchAll',
  async (limit: number | void = 100, { rejectWithValue }) => {
    try {
      const response = await axios.get<Pizza[]>(pizzasBaseUrl, {
        params: {
          _limit: limit,
        },
      })

      return response.data
    } catch (e) {
      return rejectWithValue((e as AxiosErrorResponse).response?.data?.message)
    }
  },
)

export const addPizza = createAsyncThunk(
  'pizza/add',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        pizzaReducer: { newPizzaName, newPizzaImage },
      } = getState() as RootState
      const formData = new FormData()

      if (newPizzaImage) {
        formData.append('file', newPizzaImage)
        formData.append('name', newPizzaName)
      }

      const response = await axios.post<Pizza, AxiosResponse<PizzaResponse>>(
        addPizzaUrl,
        formData,
      )

      return response.data.data
    } catch (e) {
      return rejectWithValue((e as AxiosErrorResponse).response?.data?.message)
    }
  },
)

export const removePizza = createAsyncThunk(
  'pizza/remove',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = {
        id,
      }
      const response = await axios.post<
        RemovePizzaReq,
        AxiosResponse<PizzaResponse>
      >(removePizzaUrl, data)

      return response.data.data
    } catch (e) {
      return rejectWithValue((e as AxiosErrorResponse).response?.data?.message)
    }
  },
)

export const updatePizza = createAsyncThunk(
  'pizza/update',
  async (data: Pizza, thunkApi) => {
    try {
      const response = await axios.put<Pizza>(
        `${pizzasBaseUrl}${data._id}`,
        data,
      )

      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue((e as Error).message)
    }
  },
)
