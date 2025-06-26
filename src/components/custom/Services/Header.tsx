import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/hooks/useSidebar'
import { useTags } from '@/hooks/useTags'

import { Drawer, TagsDrawer } from '.'
import { useAccount } from '@/hooks/useAccount'

export const Header = () => {
  const { handleOpenSidebar } = useSidebar()
  const { tags } = useTags()
  const { account } = useAccount()

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 h-16">
      <div className="flex items-center gap-2">
        <Button
          className="flex items-center justify-center hover:bg-gray-700 p-0 w-8 h-8 rounded-full bg-transparent"
          onClick={handleOpenSidebar}
        >
          <Menu color="#e5e7eb" size={18} strokeWidth={2} />
        </Button>

        <h1 className="text-2xl font-bold text-gray-300">
          {account.name || 'Estacionamento e lava rápido'}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {tags.length > 0 && <TagsDrawer />}
        <Drawer />
      </div>
    </header>
  )
}
