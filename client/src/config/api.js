const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    health: '/api/health',
    songs: '/api/songs'
  }
}

export default api
