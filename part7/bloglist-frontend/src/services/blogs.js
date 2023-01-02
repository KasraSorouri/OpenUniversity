import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Barear ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  // console.log('Post response -> ',response.data);
  return response.data
}

const editBlog = async (blog) => {
  //  console.log('edit blog ->', blog);

  const blogUrl = `${baseUrl}/${blog.id}`
  const response = await axios.put(blogUrl, blog)
  //  console.log('Put response -> ',response.data);
  return response.data
}

const deleteBlog = async (id) => {
  const blogUrl = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(blogUrl, config)
  //console.log('delete response -> ',response.data)
  return response.data
}

const addComment = async ( id, newComment ) => {
  console.log('add comment id -> ',id , ' comment', newComment)

  const url = `${baseUrl}/${id}/comments`
  const comment = { newComment: newComment }
  const response = await axios.post(url, comment)
  // console.log('Post response -> ',response.data);
  return response.data
}

export default {
  getAll,
  addBlog,
  setToken,
  editBlog,
  deleteBlog,
  addComment
}
