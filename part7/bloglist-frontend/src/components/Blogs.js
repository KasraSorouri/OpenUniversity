import React, { useRef } from 'react'
import AddBlog from './AddBlog'
import Blog from './Blog'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blogs = ({ state }) => {
  console.log('tempo state ->', state)
  console.log('Tempo location ->')
  const blogs = state.state.blogs
  const user = state.state.user

  console.log('Tempo blogs ->', blogs)
  const addBlogRef = useRef()

  const addBlogHandler = async (blog) => {

    try {
      addBlogRef.current.toggleVisibility()

      console.log('new blog -> ', blog)
      /*
      dispatch(createBlog(blog))
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} is added successfully!`,5))
*/
    } catch (e) {
      console.log(e)
      //dispatch(setNotification(e.response.data.error,3))

    }
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
