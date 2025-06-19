import { api } from './api'

type loginProps = {
  email: string
  password: string
}

export class AuthService {
  static async login(props: loginProps) {
    return await api.post('/auth/login', props, { withCredentials: true })
  }

  static async refreshToken() {
    return await api.post(
      '/auth/refresh',
      {},
      {
        withCredentials: true,
      }
    )
  }
}
