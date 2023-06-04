import { createSlice } from '@reduxjs/toolkit'
import { exampleStoreKey } from './example.const'
import { ExampleType } from './example.types'

const initialState: ExampleType = {
  loading: false,
  error: null,
  example: [],
}

export const accountsSlice = createSlice({
  name: exampleStoreKey,
  initialState,
  reducers: {},
})
