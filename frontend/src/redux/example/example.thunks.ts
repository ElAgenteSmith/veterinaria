import { createAsyncThunk } from '@reduxjs/toolkit'
import { exampleStoreKey } from './example.const'
//create mock data for example

export const fetchAccounts = createAsyncThunk(
  `${exampleStoreKey}/fetchAccounts`,
  async (_, thunkAPI) => {}
)
