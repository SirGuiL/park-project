import { api } from './api'

type registerParams = {
  plate: string
  brandId: string
  serviceId: string
  modelCode: string
  modelName: string
}

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

type fetchNotFinishedCarsParams = {
  page?: number
  limit?: number
  query?: string
}

export class CarsService {
  static async register(params: registerParams) {
    return api.post('/cars', params)
  }

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

  static async fetchNotFinishedCars(params: fetchNotFinishedCarsParams) {
    return api.get('/cars/not-finished', {
      params,
    })
  }

  static async deleteNotFinishedCars({ id }: { id: string }) {
    return api.delete(`/cars/not-finished/${id}`)
  }
}
