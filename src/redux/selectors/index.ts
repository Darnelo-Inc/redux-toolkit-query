import { UserState } from "../reducers/userSlice"
import { RootState } from "../store"

export const selectUsers = (state: RootState): UserState => state.users

export interface TestUser {
  id: number
  name: string
}

export interface TestState {
  users: TestUser[]
}

export const selectTest = (state: TestState): TestUser[] => state.users
