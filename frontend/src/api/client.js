import axios from 'axios'

// Dirección base de la API en un solo sitio
export const API_BASE_URL = 'http://localhost:8000/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default client
