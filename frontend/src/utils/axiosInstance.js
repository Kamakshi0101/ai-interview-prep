import axios from 'axios'

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

const axiosInstance = axios.create({
  baseURL: '',        // ← empty, apiPath.js now has full paths
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection.'
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance