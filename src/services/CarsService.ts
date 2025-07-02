import { api } from './api'

type getParams = {
  page?: number
  limit?: number
  query: string
}

type getCarsFromFipeAPIParams = {
  page?: number
  limit?: number
  brandId: string
  vehicleType: string
}

export class CarsService {
  static async get(params: getParams) {
    return api.get('/cars', {
      params,
    })
  }

  static async getCarsFromFipeAPI(params: getCarsFromFipeAPIParams) {
    return api.get('/cars/fipe', {
      params,
    })
  }
}
