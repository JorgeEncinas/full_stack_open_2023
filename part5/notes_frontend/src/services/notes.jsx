import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/notes`

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = async newObject => { //With token, async form.
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

/* const getAll2 = () => {
  return axiosFetch(axios.get)
}

const create2 = (newObject) => {
  return axiosFetch(axios.post, {newObject})
}

const update2 = (id, newObject) => {
  return axiosFetch(axios.put, {id, newObject})
}

const axiosFetch = (functionReceived, parametersObj) => {
  const request = functionReceived(baseUrl, ...parametersObj)
  return request.then(response => response.data)
} */

export default { getAll, create, update, setToken }