import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import { postAPI } from "./service/postAPI"
import { jsonPostAPI } from "./service/jsonPostAPI"

export const store = configureStore({
  reducer: {
    users: userSlice,
    [postAPI.reducerPath]: postAPI.reducer,
    [jsonPostAPI.reducerPath]: jsonPostAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postAPI.middleware, jsonPostAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
