import { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({})

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
  },[])
 
  const handelLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('BlogListAppUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('Error -> ', e)
    }
  }

  const handelLogout = () => {
    window.localStorage.removeItem('BlogListAppUser')
    setUser(null)
  }

  const addBlogHandler = async (event) => {
    event.preventDefault()
    console.log('add blog -> ', blog);

    try {
      const newBlog = await blogService.addBlog(blog)
     // console.log('new blog -> ', newBlog);
      setBlogs(blogs.concat(newBlog))
      setBlog({})
    } catch (e) {
      console.log('Error -> ', e)
    }
  }

  if (user === null) {
    return (
      <LoginForm username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handelLogin={handelLogin} />
    )
  }
  return(
    <div>
      <h3>{user.name} logged in
        <button onClick={handelLogout} >logout</button>
      </h3>
      <AddBlog blog={blog} setBlog={setBlog} addBlogHandler={addBlogHandler} />
      <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
