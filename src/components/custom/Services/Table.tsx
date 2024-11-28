import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type tagType = {
  name: string
  color: string
}

type serviceType = {
  name: string
  created_at: Date
  amount: number
  method: string
  tags: tagType[]
  updated_at: Date
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
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.method}</TableCell>
            <TableCell className="flex gap-2">
              {service.tags.map((tag, index) => {
                return (
                  <Badge
                    className="rounded-xl"
                    variant="secondary"
                    key={index}
                    style={{
                      backgroundColor: tag.color,
                    }}
                  >
                    {tag.name}
                  </Badge>
                )
              })}
            </TableCell>
            <TableCell className="text-right">
              {service.amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
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
