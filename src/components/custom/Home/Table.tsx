import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { carsInService } from '@/DTOs/car'
import { MoreHorizontal } from 'lucide-react'
import { Menu } from './Menu'

type Props = {
  carsInService: carsInService[]
  openDeleteModal: (id: string) => void
  openChargeModal: (id: string) => void
}

export const HistoryTable = (props: Props) => {
  const { carsInService, openChargeModal, openDeleteModal } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Carro</TableHead>
          <TableHead>Placa</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carsInService.map((carInService) => (
          <TableRow key={carInService.id}>
            <TableCell className="font-medium">
              {carInService.car.modelName}
            </TableCell>
            <TableCell>{carInService.car.plate}</TableCell>
            <TableCell>{carInService.services.name}</TableCell>
            <TableCell className="text-right">
              <Menu
                trigger={
                  <Button variant="ghost">
                    <MoreHorizontal />
                  </Button>
                }
                handleDelete={() => openDeleteModal(carInService.id)}
                handleFinish={() => openChargeModal(carInService.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
