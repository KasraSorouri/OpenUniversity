import { useState, useEffect, useRef } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
//import ShowError from './components/ShowError'
import './index.css'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initialize } from './reducers/blogReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
  }, [])

  const blogs = useSelector(state => state.blogs)
  console.log('app blogs ->', blogs)
  const [user, setUser] = useState(null)

  const addBlogRef = useRef()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('BlogListAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handelLogin = async ({ username, password }) => {
    try {
      const user = await loginService({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('BlogListAppUser', JSON.stringify(user))
      setUser(user)
    } catch (e) {
      dispatch(setNotification('Wrong username or password!',3))
    }
  }

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    setUser(null)
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

  let sortedBlogs
  if (blogs.length > 0) {
    sortedBlogs = blogs
  } else {
    sortedBlogs = blogs
  }

  //const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  //const sortedBlogs = blogs
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
