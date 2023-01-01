import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const AddBlog = ({ addBlog }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState({})

  const addBlogHandler = (event) => {
    event.preventDefault()
    try {
      console.log('blog add blog ->', blog)
      dispatch(createBlog(blog))
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} is added successfully!`, 5))
      addBlog()
      setBlog({})
    } catch (e) {
      console.log(e)
      dispatch(setNotification(e, 3))
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlogHandler}>
        <p>
          Title:
          <input
            type="text"
            value={blog.title || ''}
            name="title"
            placeholder="Blog title"
            onChange={({ target }) =>
              setBlog((values) => ({ ...values, [target.name]: target.value }))
            }
          />
          <br />
          Author:
          <input
            type="text"
            value={blog.author || ''}
            name="author"
            placeholder="Blog author"
            onChange={({ target }) =>
              setBlog((values) => ({ ...values, [target.name]: target.value }))
            }
          />
          <br />
          Url:
          <input
            type="text"
            value={blog.url || ''}
            name="url"
            placeholder="Blog url"
            onChange={({ target }) =>
              setBlog((values) => ({ ...values, [target.name]: target.value }))
            }
          />
        </p>
        <button onClick={addBlogHandler} id="createNewBlog" >
          Add Blog
        </button>
      </form>
    </div>
  )
}

export default AddBlog
