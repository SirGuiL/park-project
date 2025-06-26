import { useContext } from 'react'

import { AccountContext, AccountContextProps } from '../contexts/AccountContext'

export function useAccount(): AccountContextProps {
  const context = useContext(AccountContext)

  return context
}
