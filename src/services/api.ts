import { useNavigate } from 'react-router'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { status } = err.response
    const refreshToken = localStorage.getItem('@spark:refreshToken')

    const navigate = useNavigate()

    if (status === 401 && refreshToken) {
      // TODO: try to refresh token
      return Promise.reject(err)
    }

    if (status === 401) {
      navigate('/login')
      return Promise.reject(err)
    }

    throw err
  }
)

export { api }
