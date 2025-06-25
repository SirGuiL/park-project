import axios from 'axios'
import { AuthService } from './AuthService'
import { AuthStorage } from '@/storage/authStorage'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

const accessToken = AuthStorage.getAccessToken()

if (accessToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { status } = err.response || {}
    const nonAuthRoutes = ['/entrar', '/cadastro']
    const originalRequest = err.config

    if (originalRequest.url == '/auth/refresh') {
      window.location.href = '/entrar'
      return Promise.reject(err)
    }

    if (
      status === 401 &&
      !originalRequest._retry &&
      !nonAuthRoutes.includes(window.location.pathname)
    ) {
      originalRequest._retry = true

      try {
        const response = await AuthService.refreshToken()
        const { accessToken } = response.data

        AuthStorage.setAccessToken(accessToken)

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

        return api(originalRequest)
      } catch {
        window.location.href = '/entrar'
        return Promise.reject(err)
      }
    }

    if (status === 401 && !nonAuthRoutes.includes(window.location.pathname)) {
      window.location.href = '/entrar'
      return Promise.reject(err)
    }

    throw err
  }
)

export { api }
