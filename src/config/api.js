import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://65274bed917d673fd76d8c5b.mockapi.io/api/v1/'
  baseURL: 'http://localhost:3001'
})

export default api
