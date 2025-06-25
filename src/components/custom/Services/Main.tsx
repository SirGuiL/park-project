import { useServices } from '@/hooks/useServices'
import { ServicesTable } from './Table'
import { useEffect } from 'react'
import { ServicesService } from '@/services/ServicesService'

export const Main = () => {
  const { services, setStoredServices } = useServices()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServicesService.fetchAll()

        setStoredServices(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchServices()
  }, [setStoredServices])

  return (
    <div className="flex flex-col flex-1 gap-6 p-8">
      <h1 className="text-2xl font-semibold">Serviços cadastrados</h1>

      <div className="flex flex-1">
        <ServicesTable services={services} />
      </div>
    </div>
  )
}
