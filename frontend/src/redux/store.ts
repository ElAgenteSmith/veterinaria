import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { exampleStoreKey, accountsSlice } from './example'

export const store = configureStore({
  reducer: {
    [exampleStoreKey]: accountsSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
