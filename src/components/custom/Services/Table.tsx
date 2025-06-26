import { useState } from 'react'
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
import { DeleteServiceDialog, EditServiceDialog, Menu } from '.'

import { serviceType } from '@/DTOs/service'
import { ServicesService } from '@/services/ServicesService'
import { useServices } from '@/hooks/useServices'
import { formatCentsToBRL } from '@/lib/utils'

interface ServicesTableProps {
  services: serviceType[]
}

type editServiceProps = {
  amount: number
  name: string
}

export const ServicesTable = ({ services }: ServicesTableProps) => {
  const { setStoredServices } = useServices()

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [updateDialog, setUpdateDialog] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const handleOpenServiceDrawer = () => {
    const serviceDrawer = document.querySelector(
      '#add-service'
    ) as HTMLDivElement

    if (serviceDrawer) {
      serviceDrawer.click()
    }
  }

  const deleteService = async () => {
    try {
      await ServicesService.delete({ id: currentId })

      await fetchServices()
      setDeleteDialog(false)
    } catch (error) {
      console.error(error)
    }
  }

  const openDeleteServiceDialog = (id: string) => {
    setCurrentId(id)
    document.getElementById('delete-service-dialog')?.click()
  }

  const editService = async (props: editServiceProps) => {
    try {
      await ServicesService.update({
        ...props,
        id: currentId,
      })

      await fetchServices()
      setUpdateDialog(false)
    } catch (error) {
      console.error(error)
    }
  }

  const openEditServiceDialog = (id: string) => {
    setCurrentId(id)
    document.getElementById('edit-service-dialog')?.click()
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
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 bg-transparent"
                  >
                    <Ellipsis />
                  </Button>
                }
                handleDeleteService={() => openDeleteServiceDialog(service.id)}
                handleEditService={() => openEditServiceDialog(service.id)}
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

      <DeleteServiceDialog
        trigger={
          <Button className="hidden" id="delete-service-dialog"></Button>
        }
        handleDeleteService={() => deleteService()}
        dialogState={deleteDialog}
        setDialogState={setDeleteDialog}
      />

      <EditServiceDialog
        trigger={<Button className="hidden" id="edit-service-dialog"></Button>}
        handleUpdateService={editService}
        amount={formatCentsToBRL(
          Number(
            (services.find((service) => service.id === currentId)?.amount ||
              0) * 100
          )
        )}
        name={services.find((service) => service.id === currentId)?.name || ''}
        dialogState={updateDialog}
        setDialogState={setUpdateDialog}
      />
    </Table>
  )
}
