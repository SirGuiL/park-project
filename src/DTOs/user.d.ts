export type User = {
  id: string
  name: string
  email: string
  role: Role
  createdAt: Date
}

export type Role = 'ADMIN' | 'USER'
