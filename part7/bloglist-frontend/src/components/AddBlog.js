import { useState } from 'react'

const AddBlog = ({ addBlog }) => {
  const [blog, setBlog] = useState({})

  const addBlogHandler = (event) => {
    event.preventDefault()
    addBlog(blog)
    setBlog({})
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
        <button onClick={addBlogHandler} id="createNewBlog">
          Add Blog
        </button>
      </form>
    </div>
  )
}

export default AddBlog
