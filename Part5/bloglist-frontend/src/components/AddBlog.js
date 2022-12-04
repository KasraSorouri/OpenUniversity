const AddBlog = ({ blog, setBlog, addBlogHandler }) => {
  
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlogHandler}>
        <p>Title:
          <input 
            type='text'
            value={blog.title || ''}
            name='title'
            onChange={({target}) => setBlog(values => ({...values, [target.name]: target.value}))} />
        <br />
        Author:
          <input 
            type='text'
            value={blog.author || ''}
            name='author'
            onChange={({target}) => setBlog(values => ({...values, [target.name]: target.value}))} />
        <br />
        Url:
          <input 
            type='text'
            value={blog.url || ''}
            name='url'
            onChange={({target}) => setBlog(values => ({...values, [target.name]: target.value}))} />
        </p>
        <button onClick={addBlogHandler}>Add Blog</button>
      </form>
      </div>
  )
}

export default AddBlog