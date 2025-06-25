import { api } from './api'

type createProps = {
  name: string
  amount: number
  tags: string[]
}

export class ServicesService {
  static async create(props: createProps) {
    return await api.post('/services', props)
  }

  static async fetchAll() {
    return await api.get('/services')
  }

  static async delete({ id }: { id: string }) {
    return await api.delete(`/services/${id}`)
  }
}
