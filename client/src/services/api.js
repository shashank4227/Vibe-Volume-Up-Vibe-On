import axios from 'axios'
import { api } from '../config/api'

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error // Let caller handle
  }
}

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/register', userData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getMe = async () => {
  try {
    const response = await apiClient.get('/api/auth/me')
    return response.data
  } catch (error) {
    throw error
  }
}

const apiClient = axios.create({
  baseURL: api.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config
    // Only redirect if 401 and NOT from login/register endpoints
    if (error.response?.status === 401 && !originalRequest.url.includes('/auth/login') && !originalRequest.url.includes('/auth/register')) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const healthCheck = async () => {
  try {
    const response = await apiClient.get(api.endpoints.health)
    return response.data
  } catch (error) {
    throw new Error('Health check failed')
  }
}

export const getSongs = async (params = {}) => {
  try {
    const response = await apiClient.get(api.endpoints.songs, { params })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch songs')
  }
}

export const getSong = async (id) => {
  try {
    const response = await apiClient.get(`${api.endpoints.songs}/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch song')
  }
}

export const createSong = async (songData) => {
  try {
    const response = await apiClient.post(api.endpoints.songs, songData)
    return response.data
  } catch (error) {
    throw new Error('Failed to create song')
  }
}

export const updateSong = async (id, songData) => {
  try {
    const response = await apiClient.put(`${api.endpoints.songs}/${id}`, songData)
    return response.data
  } catch (error) {
    throw new Error('Failed to update song')
  }
}

export const deleteSong = async (id) => {
  try {
    const response = await apiClient.delete(`${api.endpoints.songs}/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to delete song')
  }
}

export default apiClient
