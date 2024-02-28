import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../models'
import { usersBaseUrl } from '../constants'
import { $api } from '../helpers'

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await $api.get<User[]>(`${usersBaseUrl}`)

      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message)
    }
  },
)
