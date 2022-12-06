import { useState, useEffect, useRef } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import ShowError from './components/ShowError'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMassege] = useState(null)
  const [errorMassege, setError] = useState(null)

  const addBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
      setError('Wrong username or password!')
      setTimeout(() => setError(null), 5000)
      //      console.log('Error -> ', e)
    }
  }

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    setUser(null)
  }

  const addBlogHandler = async (blog) => {
    //  console.log('add blog -> ', blog);

    try {
      const newBlog = await blogService.addBlog(blog)
      addBlogRef.current.toggleVisibility()

      console.log('new blog -> ', newBlog)
      setBlogs(blogs.concat(newBlog))
      setMassege(`A new blog ${newBlog.title} by ${newBlog.author} is added successfully!`)
      setTimeout(() => setMassege(null), 5000)
    } catch (e) {
      setError(e.response.data.error)
      setTimeout(() => setError(null), 5000)
      //     console.log('Error -> ', e)
    }
  }

  const likeHandler = async (blog) => {
    console.log('like handler -> ', blog)
    const editedBlog = {
      id: blog.id,
      title: blog.title,
      author : blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id || blog.user
    }
    try {
      const updatedBlog = await blogService.editBlog(editedBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    } catch (e) {
      setError(e.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  const deleteBlog = async (blog) => {
    console.log('delete from database ->', blog)
    const id = blog.id
    try {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (e) {
      setError(e.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <ShowError errorMassege={errorMassege} />
        <LoginForm login={handelLogin} />
      </div>
    )
  }
  return(
    <div>
      <Message message={message} />
      <ShowError errorMassege={errorMassege} />
      <h3>{user.name} logged in
        <button onClick={handelLogout} >logout</button>
      </h3>
      <Togglable buttonLabel={'Add Blog'} ref={addBlogRef} >
        <AddBlog addBlog={addBlogHandler} />
      </Togglable>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeHandler={likeHandler} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App
