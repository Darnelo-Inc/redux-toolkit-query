import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../types/user"
import { fetchUsers } from "../actions/fetchUsers"

export interface UserState {
  users: IUser[]
  loading: boolean
  error: null | string
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
}

const isError = (action: AnyAction) => action.type.endsWith("rejected")

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.users = action.payload
          state.loading = false
        }
      )
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
        state.loading = false
      })
      .addMatcher(isError, (state, action: PayloadAction<any>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export default userSlice.reducer
