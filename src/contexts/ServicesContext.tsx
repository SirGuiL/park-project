import { ReactNode, createContext, useCallback, useState } from 'react'

import { serviceType } from '../DTOs/service'

export type ServicesContextProps = {
  services: serviceType[]
  maxPages: number
  setStoredMaxPages: (maxPages: number) => void
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
  const [maxPages, setMaxPages] = useState(1)

  const createService = (service: serviceType) => {
    setServices([...services, service])
  }

  const setStoredServices = useCallback((services: serviceType[]) => {
    setServices(services)
  }, [])

  const setStoredMaxPages = useCallback((maxPages: number) => {
    setMaxPages(maxPages)
  }, [])

  return (
    <ServicesContext.Provider
      value={{
        services,
        createService,
        setStoredServices,
        maxPages,
        setStoredMaxPages,
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}
