import axios from "axios"
import { IUser } from "../../types/user"
import { createAsyncThunk } from "@reduxjs/toolkit"

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userFetch())
//     const response = await axios.get<IUser[]>(
//       "https://jsonplaceholder.typicode.com/users"
//     )
//     dispatch(userFetchSuccess(response.data))
//   } catch (error) {
//     dispatch(userFetchError(String(error)))
//   }
// }

export const fetchUsers = createAsyncThunk(
  // <IUser[],
  // undefined,
  // { rejectValue: string }>
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)
