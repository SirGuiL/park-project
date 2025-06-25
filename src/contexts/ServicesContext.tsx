import { ReactNode, createContext, useState } from 'react'

import { serviceType } from '../DTOs/service'

export type ServicesContextProps = {
  services: serviceType[]
  createService: (service: serviceType) => void
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

  const createService = (service: serviceType) => {
    setServices([...services, service])
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
