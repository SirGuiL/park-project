import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useAccount } from '@/hooks/useAccount'
import { useSidebar } from '@/hooks/useSidebar'

export const Header = () => {
  const { handleOpenSidebar } = useSidebar()
  const { account } = useAccount()

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 h-16">
      <div className="flex items-center gap-2">
        <Button
          className="flex items-center justify-center bg-transparent hover:bg-gray-700 p-0 w-8 h-8 rounded-full"
          onClick={handleOpenSidebar}
        >
          <Menu color="#e5e7eb" size={18} strokeWidth={2} />
        </Button>

        <h1 className="text-2xl font-bold text-gray-300">
          {account.name || 'Estacionamento e lava rápido'}
        </h1>
      </div>
    </header>
  )
}
