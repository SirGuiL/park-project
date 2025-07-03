import { serviceType } from './service'
import { User } from './user'

export type car = {
  modelName: string
  modelCode: string
  plate: string
  brandId: string
  created_at: Date
  serviceId: 'parked' | 'wash'
  id: string
}

export type carsInService = {
  id: string
  createdAt: Date
  isFinished: boolean
  finishedAt: Date | null
  paymentMethod: null | string
  car: car
  services: serviceType
  user: historyUserType
}

type historyUserType = User & {
  isActive: boolean
  accountId: string
  updatedAt: Date | null
}

export type serviceTypeCar = {
  service: string
  created_at: Date
}

export interface unifiedCar extends car {
  services: serviceType[]
}
