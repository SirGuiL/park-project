import { ReactNode, createContext, useCallback, useState } from 'react'

import { serviceType } from '../DTOs/service'

export type ServicesContextProps = {
  services: serviceType[]
  createService: (service: serviceType) => void
  setStoredServices: (services: serviceType[]) => void
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

  const setStoredServices = useCallback((services: serviceType[]) => {
    setServices(services)
  }, [])

  return (
    <ServicesContext.Provider
      value={{
        services,
        createService,
        setStoredServices,
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
