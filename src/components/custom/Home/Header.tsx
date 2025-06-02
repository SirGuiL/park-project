import { Button } from '@/components/ui/button'
import { useSidebar } from '@/hooks/useSidebar'
import { Menu, Plus } from 'lucide-react'
import { RegisterCarDrawer } from '../RegisterCarDrawer/RegisterCarDrawer'
import { Drawer } from '../Services'

export const Header = () => {
  const { handleOpenSidebar } = useSidebar()

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 h-16">
      <div className="flex items-center gap-2">
        <Button
          className="flex items-center justify-center hover:bg-gray-700 p-0 w-8 h-8 rounded-full"
          onClick={handleOpenSidebar}
        >
          <Menu color="#e5e7eb" size={18} strokeWidth={2} />
        </Button>

        <h1 className="text-2xl font-bold text-gray-300">
          Estacionamento e lava rápido
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Drawer
          trigger={
            <Button className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-full flex gap-1 items-center">
              <Plus color="#e5e7eb" size={18} strokeWidth={2} />

              <span>Registrar novo serviço</span>
            </Button>
          }
        />

        <RegisterCarDrawer />
      </div>
    </header>
  )
}
