import { ReactNode, createContext, useCallback, useState } from 'react'
import { User } from '@/DTOs/user'

export type UserContextProps = {
  user: User
  saveStoredUser: (user: User) => void
}

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    role: 'USER',
  })

  const saveStoredUser = useCallback((user: User) => {
    setUser(user)
  }, [])

  return (
    <UserContext.Provider value={{ user, saveStoredUser }}>
      {children}
    </UserContext.Provider>
  )
}
