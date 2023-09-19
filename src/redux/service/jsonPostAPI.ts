import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { jsonPost } from "../../types/jsonPost"

export const jsonPostAPI = createApi({
  reducerPath: "jsonPostApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    fetchJsonPosts: builder.query<jsonPost[], any>({
      query: () => ({ url: "/posts" }),
      providesTags: (_) => ["post"],
    }),
    createJsonPost: builder.mutation<jsonPost, jsonPost>({
      query: (post) => ({ url: "/posts", method: "POST", body: post }),
      invalidatesTags: ["post"],
    }),
    deleteJsonPost: builder.mutation<jsonPost, number>({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["post"],
    }),
  }),
})

export const {
  useFetchJsonPostsQuery,
  useCreateJsonPostMutation,
  useDeleteJsonPostMutation,
} = jsonPostAPI
