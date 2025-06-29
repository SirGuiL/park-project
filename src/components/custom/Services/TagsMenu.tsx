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
  handleDeleteTag: () => void
  handleEditTag: () => void
}

export const TagsMenu = (props: MenuProps) => {
  const { handleDeleteTag, handleEditTag, trigger } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0" onClick={handleDeleteTag}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Trash2 className="w-4 h-4" />

              <span className="text-sm">Excluir tag</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0" onClick={handleEditTag}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Pencil className="w-4 h-4" />

              <span className="text-sm">Editar tag</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
