import { api } from './api'

type getParams = {
  page?: number
  limit?: number
  query: string
}

type getCarsFromFipeAPIParams = {
  page?: number
  limit?: number
  query?: string
  brandId: string
  vehicleType: string
}

export class CarsService {
  static async fetchAll(params: getParams) {
    return api.get('/cars', {
      params,
    })
  }

  static async findUniqueByPlate({ plate }: { plate: string }) {
    return api.get(`/cars/${plate}/data`)
  }

  static async getCarsFromFipeAPI(params: getCarsFromFipeAPIParams) {
    return api.get('/cars/fipe', {
      params,
    })
  }
}
