import { tagType } from './tag'

export interface serviceType {
  id: string
  name: string
  amount: number
  method: string
  tags: tagType[]
  created_at: Date
  updated_at?: Date
}
