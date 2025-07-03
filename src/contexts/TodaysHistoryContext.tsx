import { carsInService } from '@/DTOs/car'
import { ReactNode, createContext, useCallback, useState } from 'react'

export type TodaysHistoryContextProps = {
  cars: carsInService[]
  search: string
  setSearch: (search: string) => void
  setStoredCars: (cars: carsInService[]) => void
  removeCar: (id: string) => void
  getCarById: (id: string) => carsInService | undefined
}

type TodaysHistoryContextProviderProps = {
  children: ReactNode
}

export const TodaysHistoryContext = createContext<TodaysHistoryContextProps>(
  {} as TodaysHistoryContextProps
)

export function TodaysHistoryContextProvider({
  children,
}: TodaysHistoryContextProviderProps) {
  const [cars, setCars] = useState<carsInService[]>([])
  const [search, setSearch] = useState('')

  const setStoredCars = useCallback((cars: carsInService[]) => {
    setCars(cars)
  }, [])

  const removeCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id))
  }

  const getCarById = (id: string) => {
    return cars.find((car) => car.id === id)
  }

  return (
    <TodaysHistoryContext.Provider
      value={{
        cars,
        setStoredCars,
        removeCar,
        getCarById,
        search,
        setSearch,
      }}
    >
      {children}
    </TodaysHistoryContext.Provider>
  )
}
