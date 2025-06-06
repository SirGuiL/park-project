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

type tagType = {
  id: string
  name: string
  color: string
}

type serviceType = {
  name: string
  created_at: Date
  amount: number
  method: string
  tags: tagType[]
  updated_at?: Date
  id: string
}

interface ServicesTableProps {
  services: serviceType[]
}

export const ServicesTable = ({ services }: ServicesTableProps) => {
  const handleOpenServiceDrawer = () => {
    const serviceDrawer = document.querySelector(
      '#add-service'
    ) as HTMLDivElement

    if (serviceDrawer) {
      serviceDrawer.click()
    }
  }

  const formatMethodSpan = (method: string) => {
    switch (method) {
      case 'fixed':
        return 'Fixo'
      case 'hour':
        return 'Hora'
      case 'day':
        return 'Dia'
      case 'custom':
        return 'Personalizado'
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
          <TableHead className="w-[200px]">Nome</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{formatMethodSpan(service.method)}</TableCell>
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
