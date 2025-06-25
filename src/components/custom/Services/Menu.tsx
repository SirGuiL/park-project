import { Pencil, Trash2 } from 'lucide-react'
import { ReactNode } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MenuProps {
  trigger: ReactNode
  handleDeleteService: () => void
  handleEditService: () => void
}

export function Menu(props: MenuProps) {
  const { handleDeleteService, handleEditService, trigger } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0" onClick={handleDeleteService}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Trash2 className="w-4 h-4" />

              <span className="text-sm">Excluir serviço</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0" onClick={handleEditService}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Pencil className="w-4 h-4" />

              <span className="text-sm">Editar serviço</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
