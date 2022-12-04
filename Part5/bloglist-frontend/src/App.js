import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
 
  const handelLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
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
      <h3>{user.name} logged in</h3>
      <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
