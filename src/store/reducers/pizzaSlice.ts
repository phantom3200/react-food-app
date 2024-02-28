import { Pizza } from '../../models'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { addPizza, fetchPizzas, removePizza, updatePizza } from '../../services'

export type PizzaState = {
  pizzasList: Pizza[]
  newPizzaName: string
  newPizzaImage: File | null
  isLoading: boolean
  error: string
}

export const initialPizzasState: PizzaState = {
  pizzasList: [],
  newPizzaName: '',
  newPizzaImage: null,
  isLoading: false,
  error: '',
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialPizzasState,
  reducers: {
    setNewPizzaName(state, { payload }: PayloadAction<string>) {
      state.newPizzaName = payload
    },
    setNewPizzaImage(state, { payload }: PayloadAction<File>) {
      state.newPizzaImage = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchPizzas.rejected,
          addPizza.rejected,
          removePizza.rejected,
          updatePizza.rejected,
        ),
        (state: PizzaState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
      .addMatcher(
        isAnyOf(
          fetchPizzas.pending,
          addPizza.pending,
          removePizza.pending,
          updatePizza.pending,
        ),
        (state: PizzaState) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          fetchPizzas.fulfilled,
          addPizza.fulfilled,
          removePizza.fulfilled,
          /*updatePizza.fulfilled,*/
        ),
        (state: PizzaState, action: PayloadAction<Pizza[]>) => {
          state.isLoading = false
          state.error = ''
          state.pizzasList = action.payload
        },
      )
  },
})

export default pizzaSlice.reducer
