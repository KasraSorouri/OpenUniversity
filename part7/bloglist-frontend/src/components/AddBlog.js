import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={addBlogHandler} id="createNewBlog" >
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={blog.title || ''}
            name="title"
            placeholder="Blog title"
            onChange={({ target }) =>
              setBlog((values) => ({ ...values, [target.name]: target.value }))
            }
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={blog.author || ''}
            name="author"
            placeholder="Blog author"
            onChange={({ target }) =>
              setBlog((values) => ({ ...values, [target.name]: target.value }))
            }
          />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            value={blog.url || ''}
            name="url"
            placeholder="Blog url"
            onChange={({ target }) =>
              setBlog((values) => ({ ...values, [target.name]: target.value }))
            }
          />
          <br />
          <Button variant='primary' type='submit' >
            Add Blog
          </Button>
        </Form.Group>
      </Form>
      <br />
    </div>
  )
}

export default AddBlog
