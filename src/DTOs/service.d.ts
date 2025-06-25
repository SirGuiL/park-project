import { tagType } from './tag'

export interface serviceType {
  id: string
  name: string
  amount: number
  tags: tagType[]
  createdAt: Date
  updatedAt?: Date
}
