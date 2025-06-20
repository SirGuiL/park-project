import { api } from './api'

type createProps = {
  name: string
}

export class TagsService {
  static async get() {
    return await api.get('/tags')
  }

  static async create(props: createProps) {
    return await api.post('/tags', props)
  }
}
