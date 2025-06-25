import { Button } from '@/components/ui/button'
import { List, LayoutGrid } from 'lucide-react'
import { TodaysHistory } from '../TodaysHistory'
import { useState } from 'react'
import { usePreferences } from '@/hooks/usePreferences'
import { useTodaysHistory } from '@/hooks/useTodaysHistory'
import { Tooltip } from 'react-tooltip'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

export const Main = () => {
  const [historyOrientation, setHistoryOrientation] = useState<'grid' | 'list'>(
    'list'
  )

  const { numberOfVacancies } = usePreferences()
  const { totalParked, totalWash, search, setSearch } = useTodaysHistory()

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

          <TodaysHistory mode={historyOrientation} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2 shadow-lg p-2 items-center justify-center self-start">
            <Button
              className={`flex items-center justify-center bg-white hover:bg-gray-100 p-0 w-8 h-8 rounded-sm shadow-none ${
                historyOrientation === 'list' ? 'bg-gray-100' : ''
              }`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Lista"
              onClick={() => setHistoryOrientation('list')}
            >
              <List color="#111827" size={24} strokeWidth={2} />
            </Button>

            <Button
              className={`flex items-center justify-center bg-white hover:bg-gray-100 p-0 w-8 h-8 rounded-sm shadow-none ${
                historyOrientation === 'grid' ? 'bg-gray-100' : ''
              }`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Quadros"
              onClick={() => setHistoryOrientation('grid')}
            >
              <LayoutGrid color="#111827" size={24} strokeWidth={2} />
            </Button>
          </div>

          <div className="rounded-lg shadow-lg flex flex-col gap-2 p-2">
            <span className="text-gray-600 text-sm">
              Vagas livres: {numberOfVacancies - totalParked}
            </span>

            <span className="text-gray-600 text-sm">
              Carros estacionados: {totalParked}
            </span>

            <span className="text-gray-600 text-sm">
              Lavagens de hoje: {totalWash}
            </span>

            <Link
              className="text-sky-600 text-sm hover:text-sky-700 duration-200 transition-all self-start"
              to={'/metricas'}
            >
              Métricas avançadas
            </Link>
          </div>
        </div>
      </div>

      <Tooltip id="my-tooltip" />
    </main>
  )
}
