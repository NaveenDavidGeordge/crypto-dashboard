import axios, { AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL
console.log('API_URL:', API_URL)

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* ================================
   REQUEST INTERCEPTOR
   - Attach JWT token automatically
================================ */
api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => Promise.reject(error)
)

/* ================================
   RESPONSE INTERCEPTOR
   - Handle auth errors globally
================================ */
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        if(!(window.location.pathname == "/login")) window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

