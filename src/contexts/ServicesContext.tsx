import { ReactNode, createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { serviceType } from '../DTOs/service'

type createServiceProps = Omit<serviceType, 'id' | 'created_at'>

export type ServicesContextProps = {
  services: serviceType[]
  createService: (service: createServiceProps) => void
}

type ServicesContextProviderProps = {
  children: ReactNode
}

export const ServicesContext = createContext<ServicesContextProps>(
  {} as ServicesContextProps
)

export function ServicesContextProvider({
  children,
}: ServicesContextProviderProps) {
  const [services, setServices] = useState<serviceType[]>([])

  const createService = (service: createServiceProps) => {
    const serviceWithId: serviceType = {
      id: uuid(),
      ...service,
      created_at: new Date(),
    }

    setServices([...services, serviceWithId])
  }

  return (
    <ServicesContext.Provider
      value={{
        services,
        createService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
