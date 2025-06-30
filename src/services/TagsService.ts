import { api } from './api'

type createProps = {
  name: string
}

export class TagsService {
  static async get({ page = 1 }: { page?: number }) {
    return await api.get('/tags', {
      params: {
        page,
      },
    })
  }

  static async create(props: createProps) {
    return await api.post('/tags', props)
  }

  static async delete({ id }: { id: string }) {
    return await api.delete(`/tags/${id}`)
  }
}
