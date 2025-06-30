import { useServices } from '@/hooks/useServices'
import { ServicesTable } from './Table'
import { useEffect, useState } from 'react'
import { ServicesService } from '@/services/ServicesService'
import { hasCachedPage } from '@/lib/utils'

export const Main = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { services, setStoredServices, maxPages, setStoredMaxPages } =
    useServices()

  const paginatedServices = services.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  )

  const onChangePagination = async (page: number) => {
    const alreadySearched = hasCachedPage({
      cachedItems: services,
      page,
    })

    if (alreadySearched) return

    try {
      const response = await ServicesService.fetchAll({ page })

      setStoredServices([...services, ...response.data.services])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServicesService.fetchAll({ page: 1 })

        setStoredServices(response.data.services)
        setStoredMaxPages(Math.ceil(response.data.count / 10))
      } catch (error) {
        console.error(error)
      }
    }

    fetchServices()
  }, [setStoredServices, setStoredMaxPages])

  return (
    <div className="flex flex-col flex-1 gap-6 p-8">
      <h1 className="text-2xl font-semibold">Serviços cadastrados</h1>

      <div className="flex flex-1">
        <ServicesTable
          services={paginatedServices}
          maxPages={maxPages}
          currentPage={currentPage}
          setCurrentPage={(page) => {
            setCurrentPage(page)
            onChangePagination(page)
          }}
        />
      </div>
    </div>
  )
}
