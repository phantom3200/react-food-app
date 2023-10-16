import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { Pizza } from '../models'

// rtk query - альтернативный метод вместо extraReducers
export const pizzaAPI = createApi({
  reducerPath: 'pizzaAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Pizza'],
  endpoints: (build) => ({
    fetchAllPizzas: build.query<Pizza[], number | void>({
      query: (limit = 100) => ({
        url: 'pizzas',
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ['Pizza'],
    }),
    addPizza: build.mutation<Pizza, Pizza>({
      query: (pizza) => ({
        url: 'pizzas',
        method: 'POST',
        body: pizza,
      }),
      invalidatesTags: ['Pizza'],
    }),
    removePizza: build.mutation<Pizza, Pizza>({
      query: (pizza) => ({
        url: `pizzas/${pizza.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pizza'],
    }),
    updatePizza: build.mutation<Pizza, Pizza>({
      query: (pizza) => ({
        url: `pizzas/${pizza.id}`,
        method: 'PUT',
        body: pizza,
      }),
      invalidatesTags: ['Pizza'],
    }),
  }),
})
