import { api } from './api'

type createProps = {
  email: string
  password: string
  name: string
  accountId: string
  role?: 'ADMIN' | 'USER'
}

type updateProps = {
  id: string
  name: string
  email: string
}

type updatePasswordProps = {
  id: string
  password: string
}

export class UserService {
  static async create(props: createProps) {
    return await api.post('/users', props)
  }

  static async get() {
    return await api.get('/users')
  }

  static async update(props: updateProps) {
    const { email, name, id } = props

    return await api.put(`/users/${id}`, { email, name })
  }

  static async delete({ id }: { id: string }) {
    return await api.delete(`/users/${id}`)
  }

  static async updatePassword({ id, password }: updatePasswordProps) {
    return await api.patch(`/users/${id}/password`, { password })
  }

  static async inactive({ id }: { id: string }) {
    return await api.patch(`/users/${id}/deactivate`)
  }

  static async sendUpdatePasswordLink() {
    return await api.post(
      '/users/forgot-password',
      {},
      {
        headers: {
          'X-Frontend-URL': window.location.origin,
        },
      }
    )
  }
}
