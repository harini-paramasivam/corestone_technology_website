import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network / connectivity issues
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('The request timed out. Please try again.'))
      }
      return Promise.reject(new Error('Unable to reach the server. Please check your connection and try again.'))
    }

    const status = error.response?.status
    const backendMsg = error.response?.data?.error

    // Prefer a backend-provided, user-friendly error message if present
    if (backendMsg && typeof backendMsg === 'string' && !backendMsg.toLowerCase().includes('internal')) {
      return Promise.reject(new Error(backendMsg))
    }

    if (status === 404) {
      return Promise.reject(new Error('Service temporarily unavailable. Please try again shortly.'))
    }
    if (status === 422 || status === 400) {
      return Promise.reject(new Error('Please check that all fields are filled correctly and try again.'))
    }
    if (status === 500 || status === 502 || status === 503) {
      return Promise.reject(new Error('The server encountered an error. Please try again in a moment.'))
    }

    return Promise.reject(new Error('Something went wrong. Please try again.'))
  }
)

export default api
