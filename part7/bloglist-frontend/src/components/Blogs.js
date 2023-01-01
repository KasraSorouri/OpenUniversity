import React, { useRef } from 'react'
import AddBlog from './AddBlog'
import Blog from './Blog'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
//import { useDispatch } from 'react-redux'
//import { createBlog } from '../reducers/blogReducer'
//import { setNotification } from '../reducers/notificationReducer'

const Blogs = ({ state }) => {
  //const dispatch = useDispatch()
  const blogs = state.state.blogs
  const user = state.state.user
  const addBlogRef = useRef()

  const addBlogHandler = async() => {
    addBlogRef.current.toggleVisibility()
    /*
    try {
      console.log('blog add blog ->', blog)
      dispatch(createBlog(blog))
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} is added successfully!`, 5))
    } catch (e) {
      console.log(e)
      dispatch(setNotification(e, 3))

    }
    */
  }
  return (
    <div>
      <Togglable buttonLabel={'Add Blog'} ref={addBlogRef}>
        <AddBlog addBlog={addBlogHandler} />
      </Togglable>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} >
          <Blog
            blog={blog}
            user={user}
          />
        </Link>
      ))}
    </div>
  )
}

export default Blogs
