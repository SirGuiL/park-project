import { api } from './api'

type createProps = {
  email: string
  password: string
  name: string
  accountId: string
  role?: 'ADMIN' | 'USER'
}

export class UserService {
  static async create(props: createProps) {
    return await api.post('/users', props)
  }

  static async get() {
    return await api.get('/users')
  }
}
