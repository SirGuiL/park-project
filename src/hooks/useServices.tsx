import { useContext } from 'react'

import {
  ServicesContext,
  ServicesContextProps,
} from '../contexts/ServicesContext'

export function useServices(): ServicesContextProps {
  const context = useContext(ServicesContext)

  return context
}
