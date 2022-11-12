
import axios from 'axios'

const api = axios.create({

  baseURL: 'http://localhost:5276/api/',
  // baseURL: 'http://100.96.1.3:5276/api/',
  timeout: 155000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api


