import { api } from './api'

type createProps = {
  name: string
  amount: number
  tags: string[]
}

type updateProps = Omit<createProps, 'tags'> & {
  id: string
}

export class ServicesService {
  static async create(props: createProps) {
    return await api.post('/services', props)
  }

  static async fetchAll({ page = 1 }: { page: number }) {
    return await api.get('/services', {
      params: {
        page,
      },
    })
  }

  static async delete({ id }: { id: string }) {
    return await api.delete(`/services/${id}`)
  }

  static async update(props: updateProps) {
    const { amount, name, id } = props

    return await api.put(`/services/${id}`, { amount, name })
  }
}
