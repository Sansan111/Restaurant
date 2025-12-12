import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:8090',
  withCredentials: true, // Important: send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api

