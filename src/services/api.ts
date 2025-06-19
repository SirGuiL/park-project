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

    if (status === 401 && !nonAuthRoutes.includes(window.location.pathname)) {
      try {
        const response = await AuthService.refreshToken()
        const { accessToken } = response.data

        AuthStorage.setAccessToken(accessToken)

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        return api.request(err.config)
      } catch {
        window.location.href = '/entrar'
        return Promise.reject(err)
      }
    }

    throw err
  }
)

export { api }
