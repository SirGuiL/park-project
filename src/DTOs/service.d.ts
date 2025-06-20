import { tagType } from './tag'

export interface serviceType {
  id: string
  name: string
  amount: number
  tags: tagType[]
  created_at: Date
  updated_at?: Date
}
