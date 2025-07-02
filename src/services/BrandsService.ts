import { api } from './api'

type getAllBrandsProps = {
  query: string
  type: string
  page?: number
  limit?: number
}

export class BrandsService {
  static async getAllBrands(params: getAllBrandsProps) {
    return await api.get('/brands', {
      params,
    })
  }
}
