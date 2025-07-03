import { ReactNode } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DollarSign, Trash2 } from 'lucide-react'

type MenuProps = {
  handleFinish: () => void
  handleDelete: () => void
  trigger: ReactNode
}

export const Menu = (props: MenuProps) => {
  const { handleDelete, handleFinish, trigger } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-white" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0" onClick={handleDelete}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 flex-1 p-2">
              <Trash2 className="w-4 h-4 text-red-600" />

              <span className="text-sm">Excluir</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0" onClick={handleFinish}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-2 flex-1 p-2">
              <DollarSign className="w-4 h-4 text-green-600" />

              <span className="text-sm">Cobrar</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
