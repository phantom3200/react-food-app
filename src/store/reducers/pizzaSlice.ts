import { Pizza } from '../../models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../../helpers'

interface PizzaState {
  pizzasList: Pizza[]
  isLoading: boolean
  error: string
}

export const initialPizzasState: PizzaState = {
  pizzasList: [],
  isLoading: false,
  error: '',
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialPizzasState,
  reducers: {
    /* increment(state, action: PayloadAction<number>) {
            state.counter += action.payload
        },
        decrement(state, action: PayloadAction<number>) {
            state.counter -= action.payload
        },*/
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isRejectedAction,
        (state: PizzaState, action: PayloadAction<string>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
      .addMatcher(isPendingAction, (state: PizzaState) => {
        state.isLoading = true
      })
      .addMatcher(
        isFulfilledAction,
        (state: PizzaState, action: PayloadAction<Pizza[]>) => {
          state.isLoading = false
          state.error = ''
          if (action.payload) state.pizzasList = action.payload
        },
      )
  },
})

export default pizzaSlice.reducer
