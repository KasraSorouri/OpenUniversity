import { useEffect, useRef } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initialize } from './reducers/blogReducer'
import { loginUser, setUser, userInitialize } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => { dispatch(initialize()) }, [])
  useEffect(() => { dispatch(userInitialize()) },[])

  const blogs = useSelector(state => state.blogs)
  let user = useSelector(state => state.user)

  const addBlogRef = useRef()

  const handelLogin = ({ username, password }) => {
    dispatch(loginUser(username, password))
  }

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    dispatch(setUser(null))
  }

  const addBlogHandler = async (blog) => {

    try {
      addBlogRef.current.toggleVisibility()

      console.log('new blog -> ', blog)
      dispatch(createBlog(blog))
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} is added successfully!`,5))

    } catch (e) {
      dispatch(setNotification(e.response.data.error,3))

    }
  }

  const sortedBlogs = blogs

  //sortedBlogs = sortedBlogs.sort((a, b) => b.likes - a.likes)
  if (user === null) {
    return (
      <div>
        <Notification  />
        <LoginForm login={handelLogin} />
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <h3>
        {user.name} logged in
        <button onClick={handelLogout}>logout</button>
      </h3>
      <Togglable buttonLabel={'Add Blog'} ref={addBlogRef}>
        <AddBlog addBlog={addBlogHandler} />
      </Togglable>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          // deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
