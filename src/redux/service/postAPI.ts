import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IPost } from "../../types/post"

export const postAPI = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: "/posts",
        params: { _limit: limit },
      }),
    }),
  }),
})

export const { useFetchPostsQuery } = postAPI
