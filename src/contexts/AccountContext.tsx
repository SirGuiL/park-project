import { ReactNode, createContext, useCallback, useState } from 'react'
import { Account } from '@/DTOs/account'
import { User } from '@/DTOs/user'

export type AccountContextProps = {
  account: Account
  accountUsers: User[]
  saveStoredAccount: (account: Account) => void
  saveStoredAccountUsers: (users: User[]) => void
}

type AccountContextProviderProps = {
  children: ReactNode
}

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps
)

export function AccountContextProvider({
  children,
}: AccountContextProviderProps) {
  const [accountUsers, setAccountUsers] = useState<User[]>([])
  const [account, setAccount] = useState<Account>({
    id: '',
    name: '',
    created_at: new Date(),
    cnpj: '',
  })

  const saveStoredAccount = useCallback((account: Account) => {
    setAccount(account)
  }, [])

  const saveStoredAccountUsers = useCallback((users: User[]) => {
    setAccountUsers(users)
  }, [])

  return (
    <AccountContext.Provider
      value={{
        account,
        saveStoredAccount,
        accountUsers,
        saveStoredAccountUsers,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
