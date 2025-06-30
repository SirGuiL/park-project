import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
import { DeleteServiceDialog, EditServiceDialog, Menu } from '.'

import { serviceType } from '@/DTOs/service'
import { ServicesService } from '@/services/ServicesService'
import { useServices } from '@/hooks/useServices'
import { formatCentsToBRL } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

interface Props {
  services: serviceType[]
  maxPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

type editServiceProps = {
  amount: number
  name: string
}

export const ServicesTable = (props: Props) => {
  const { maxPages, services, currentPage, setCurrentPage } = props

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [updateDialog, setUpdateDialog] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const { setStoredServices, setStoredMaxPages } = useServices()

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
      const response = await ServicesService.fetchAll({ page: currentPage })

      setStoredServices(response.data.services)
      setStoredMaxPages(Math.ceil(response.data.count / 10))
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
    <div className="flex flex-col flex-1">
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
                <span>
                  {service.tags.length > 0
                    ? service.tags.map((tag) => tag.name).join(', ')
                    : 'Nenhuma tag'}
                </span>
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
                  handleDeleteService={() =>
                    openDeleteServiceDialog(service.id)
                  }
                  handleEditService={() => openEditServiceDialog(service.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <DeleteServiceDialog
          trigger={
            <Button className="hidden" id="delete-service-dialog"></Button>
          }
          handleDeleteService={() => deleteService()}
          dialogState={deleteDialog}
          setDialogState={setDeleteDialog}
        />

        <EditServiceDialog
          trigger={
            <Button className="hidden" id="edit-service-dialog"></Button>
          }
          handleUpdateService={editService}
          amount={formatCentsToBRL(
            Number(
              (services.find((service) => service.id === currentId)?.amount ||
                0) * 100
            )
          )}
          name={
            services.find((service) => service.id === currentId)?.name || ''
          }
          dialogState={updateDialog}
          setDialogState={setUpdateDialog}
        />
      </Table>

      {maxPages > 1 && (
        <div className="ml-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft />
                  Anterior
                </Button>
              </PaginationItem>

              {currentPage > 1 && (
                <PaginationItem
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <PaginationLink>{currentPage - 1}</PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem className="cursor-pointer">
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>

              {maxPages > currentPage && (
                <PaginationItem
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <PaginationLink>{currentPage + 1}</PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <Button
                  variant="ghost"
                  disabled={currentPage === maxPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Próximo
                  <ChevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
