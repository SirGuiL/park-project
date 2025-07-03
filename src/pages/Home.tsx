import { Header, Main, Footer } from '@/components/custom/Home'
import { useTodaysHistory } from '@/hooks/useTodaysHistory'
import { CarsService } from '@/services/CarsService'
import { useEffect } from 'react'

export const Home = () => {
  const { setStoredCars } = useTodaysHistory()

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const response = await CarsService.fetchNotFinishedCars()

        setStoredCars(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAllCars()
  }, [setStoredCars])

  return (
    <div className="h-screen flex flex-1 flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
