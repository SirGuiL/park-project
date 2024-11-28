import { useServices } from '@/hooks/useServices'
import { ServicesTable } from './Table'

export const Main = () => {
  const { services } = useServices()

  return (
    <div className="flex flex-col flex-1 gap-6 p-8">
      <h1 className="text-2xl font-semibold">Serviços cadastrados</h1>

      <div className="flex flex-1">
        <ServicesTable services={services} />
      </div>
    </div>
  )
}
