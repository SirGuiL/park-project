import { api } from './api'

type createProps = {
  name: string
}

export class AccountService {
  static async create(props: createProps) {
    return await api.post('/account', props)
  }

  static async get() {
    return await api.get('/account')
  }
}
