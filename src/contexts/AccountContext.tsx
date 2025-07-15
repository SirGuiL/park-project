import { ReactNode, createContext, useCallback, useState } from 'react'
import { Account } from '@/DTOs/account'
import { User } from '@/DTOs/user'

export type AccountContextProps = {
  account: Account
  accountUsers: User[]
  saveStoredAccount: (account: Account) => void
  saveStoredAccountUsers: (users: User[]) => void
  page: number
  maxPages: number
  setPage: (page: number) => void
  saveStoredMaxPages: (maxPages: number) => void
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
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)

  const saveStoredAccount = useCallback((account: Account) => {
    setAccount(account)
  }, [])

  const saveStoredAccountUsers = useCallback((users: User[]) => {
    setAccountUsers(users)
  }, [])

  const saveStoredMaxPages = useCallback((maxPages: number) => {
    setMaxPages(maxPages)
  }, [])

  return (
    <AccountContext.Provider
      value={{
        account,
        saveStoredAccount,
        accountUsers,
        saveStoredAccountUsers,
        page,
        maxPages,
        saveStoredMaxPages,
        setPage,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
