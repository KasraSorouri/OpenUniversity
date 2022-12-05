import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Barear ${newToken}`
//  console.log('token -> ', token);
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
 // console.log('Post response -> ',response.data);
  return response.data
}


export default {
  getAll,
  addBlog,
  setToken
}