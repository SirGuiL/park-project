import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Ellipsis } from 'lucide-react'
import { Menu } from './Menu'
import { serviceType } from '@/DTOs/service'
import { ServicesService } from '@/services/ServicesService'
import { useServices } from '@/hooks/useServices'

interface ServicesTableProps {
  services: serviceType[]
}

export const ServicesTable = ({ services }: ServicesTableProps) => {
  const { setStoredServices } = useServices()

  const handleOpenServiceDrawer = () => {
    const serviceDrawer = document.querySelector(
      '#add-service'
    ) as HTMLDivElement

    if (serviceDrawer) {
      serviceDrawer.click()
    }
  }

  const deleteService = async (id: string) => {
    try {
      await ServicesService.delete({ id })

      fetchServices()
    } catch (error) {
      console.error(error)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await ServicesService.fetchAll()

      setStoredServices(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (services.length == 0) {
    return (
      <div>
        <div>
          Nenhum serviço cadastrado,{' '}
          <a
            className="text-sky-700 cursor-pointer"
            onClick={() => handleOpenServiceDrawer()}
          >
            clique aqui
          </a>{' '}
          para adicionar um novo
        </div>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Nome</TableHead>
          <TableHead className="min-w-[200px]">Tags</TableHead>
          <TableHead className="min-w-[200px]">Preço</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell className="flex gap-2">
              <span>{service.tags.map((tag) => tag.name).join(', ')}</span>
            </TableCell>
            <TableCell>
              {service.amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell className="text-right">
              <Menu
                trigger={
                  <Button variant="secondary" size="icon" className="size-8">
                    <Ellipsis />
                  </Button>
                }
                handleDeleteService={() => deleteService(service.id)}
                handleEditService={() => {}}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  )
}
