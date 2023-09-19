import { useEffect } from "react"
import "./App.css"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { fetchUsers } from "./redux/actions/fetchUsers"
import { useFetchPostsQuery } from "./redux/service/postAPI"
import {
  useCreateJsonPostMutation,
  useDeleteJsonPostMutation,
  useFetchJsonPostsQuery,
} from "./redux/service/jsonPostAPI"
import { jsonPost } from "./types/jsonPost"
import { selectUsers } from "./redux/selectors"

function App() {
  const { users, loading, error } = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetch1,
  } = useFetchPostsQuery(5, { pollingInterval: 100000 })

  const {
    data: jsonPosts,
    isLoading: jsonLoading,
    error: jsonError,
    refetch: refetch2,
  } = useFetchJsonPostsQuery("")

  const [createPost] = useCreateJsonPostMutation()
  const [deletePost] = useDeleteJsonPostMutation()

  const handleCreate = () => {
    const title = prompt()
    if (title) createPost({ title } as jsonPost)
  }

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="App">
      <button onClick={refetch1}>Refetch</button>
      <h2>Users:</h2>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error[0]}</h2>}
      {users &&
        users.map((user) => (
          <div key={user.id}>
            {user.id}. {user.name}
          </div>
        ))}

      <hr />

      <h2>Posts:</h2>
      {postsLoading && <h2>Loading...</h2>}
      {postsError && <h2>Error occured</h2>}
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            {post.id}. {post.title}
          </div>
        ))}

      <hr />

      <button onClick={handleCreate}>Create Json Post</button>
      <button onClick={refetch2}>Refetch</button>
      <h2>JSON Posts:</h2>
      {jsonLoading && <h2>Loading...</h2>}
      {jsonError && <h2>Error occured</h2>}
      {jsonPosts &&
        jsonPosts.map((post) => (
          <div
            key={post.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              {post.id}. {post.title}
            </div>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))}
    </div>
  )
}

export default App
