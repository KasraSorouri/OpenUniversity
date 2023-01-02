import React, { useRef } from 'react'
import AddBlog from './AddBlog'
//import Blog from './Blog'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ state }) => {
  //const dispatch = useDispatch()
  const blogs = state.state.blogs
  //const user = state.state.user
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
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}  >
                  {blog.title}
                </Link>
              </td>
              <td>
                  by {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
