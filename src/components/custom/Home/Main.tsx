import { usePreferences } from '@/hooks/usePreferences'
import { useTodaysHistory } from '@/hooks/useTodaysHistory'
import { Tooltip } from 'react-tooltip'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

import { HistoryTable, ChargeServiceDialog, DeleteCarInServiceDialog } from '.'
import { useState } from 'react'
import { CarsService } from '@/services/CarsService'

export const Main = () => {
  const [isOpenChargeDialog, setIsOpenChargeDialog] = useState(false)
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const { numberOfVacancies } = usePreferences()
  const { search, setSearch, cars, setStoredCars } = useTodaysHistory()

  const handleOpenChargeDialog = (id: string) => {
    setCurrentId(id)
    setIsOpenChargeDialog(true)
  }

  const handleOpenDeleteDialog = (id: string) => {
    setCurrentId(id)
    setIsOpenDeleteDialog(true)
  }

  const handleDeleteCarInService = async () => {
    try {
      await CarsService.deleteNotFinishedCars({ id: currentId })

      await fetchAllRegisters()
    } catch (error) {
      console.error(error)
    } finally {
      setIsOpenDeleteDialog(false)
    }
  }

  const fetchAllRegisters = async () => {
    try {
      const response = await CarsService.fetchNotFinishedCars()

      setStoredCars(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="flex flex-1 py-2 px-4">
      <div className="flex flex-1 gap-4">
        <div className="flex-1">
          <div className="flex gap-2 px-4 py-2">
            <Input
              type="email"
              placeholder="Busque pelo nome do carro..."
              className="rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="px-4 py-2">
            {cars.length > 0 ? (
              <HistoryTable
                carsInService={cars}
                openChargeModal={handleOpenChargeDialog}
                openDeleteModal={handleOpenDeleteDialog}
              />
            ) : (
              <span className="text-gray-600 text-sm">
                Nenhum carro registrado até o momento
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg shadow-lg flex flex-col gap-2 p-2">
            <span className="text-gray-600 text-sm">
              Vagas livres: {numberOfVacancies}
            </span>

            <span className="text-gray-600 text-sm">
              Carros estacionados: 0
            </span>

            <span className="text-gray-600 text-sm">Lavagens de hoje: 0</span>

            <Link
              className="text-sky-600 text-sm hover:text-sky-700 duration-200 transition-all self-start"
              to={'/metricas'}
            >
              Métricas avançadas
            </Link>
          </div>
        </div>
      </div>

      <ChargeServiceDialog
        isOpen={isOpenChargeDialog}
        setIsOpen={(value: boolean) => setIsOpenChargeDialog(value)}
      />
      <DeleteCarInServiceDialog
        isOpen={isOpenDeleteDialog}
        setIsOpen={(value: boolean) => setIsOpenDeleteDialog(value)}
        handleDelete={() => handleDeleteCarInService()}
      />
      <Tooltip id="my-tooltip" />
    </main>
  )
}
