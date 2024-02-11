import axios from 'axios'
const baseUrl = '/api/blogs' //Idk why it works here without specifying the backend URL

let token = null

const setToken = (userToken) => {
    token = `Bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

export default { getAll, setToken, create }