import { User } from '../../models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUsers } from '../../services'

export type UsersState = {
  usersList: User[]
  isLoading: boolean
  error: string
}

export const initialUsersState: UsersState = {
  usersList: [],
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'user',
  initialState: initialUsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsers.rejected,
        (state: UsersState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.isLoading = true
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => {
          state.isLoading = false
          state.error = ''
          state.usersList = action.payload
        },
      )
  },
})

export default usersSlice.reducer
