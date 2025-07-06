import { carsInService } from '@/DTOs/car'
import { ReactNode, createContext, useCallback, useState } from 'react'

export type TodaysHistoryContextProps = {
  cars: carsInService[]
  page: number
  maxPages: number
  search: string
  setSearch: (search: string) => void
  setStoredCars: (params: setStoredCarsType) => void
  removeCar: (id: string) => void
  getCarById: (id: string) => carsInService | undefined
}

type setStoredCarsType = {
  cars: carsInService[]
  page: number
  totalItems: number
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
  const [maxPages, setMaxPages] = useState(1)
  const [page, setPage] = useState(1)

  const setStoredCars = useCallback((params: setStoredCarsType) => {
    const { cars, page, totalItems } = params

    setCars(cars)
    setPage(page)
    setMaxPages(Math.ceil(totalItems / 10))
  }, [])

  const setSearchQuery = useCallback((query: string) => {
    setSearch(query)
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
        page,
        maxPages,
        setStoredCars,
        removeCar,
        getCarById,
        search,
        setSearch: setSearchQuery,
      }}
    >
      {children}
    </TodaysHistoryContext.Provider>
  )
}
