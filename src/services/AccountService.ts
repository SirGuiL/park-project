import { api } from './api'

type createProps = {
  name: string
}

type updateProps = createProps & {
  id: string
  cnpj?: string
}

type getUsersProps = {
  page: number
  limit: number
  query: string
}

export class AccountService {
  static async create(props: createProps) {
    return await api.post('/account', props)
  }

  static async get() {
    return await api.get('/account')
  }

  static async update(props: updateProps) {
    const { id, name, cnpj } = props

    return await api.put(`/account/${id}`, {
      name,
      cnpj,
    })
  }

  static async getUsers(props: getUsersProps) {
    return await api.get('/account/users', {
      params: props,
    })
  }
}
