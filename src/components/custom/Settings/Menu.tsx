import { ReactNode } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Lock, Pencil, Trash2 } from 'lucide-react'

type MenuProps = {
  handleEdit: () => void
  handleDelete: () => void
  copyUpdatePasswordLink: () => void
  trigger: ReactNode
}

export const Menu = (props: MenuProps) => {
  const { handleDelete, handleEdit, copyUpdatePasswordLink, trigger } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0" onClick={handleDelete}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Trash2 className="w-4 h-4" />

              <span className="text-sm">Excluir usuário</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0" onClick={handleEdit}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Pencil className="w-4 h-4" />

              <span className="text-sm">Editar usuário</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0" onClick={copyUpdatePasswordLink}>
            <div className="cursor-pointer hover:bg-gray-100 flex items-center gap-1 flex-1 p-2">
              <Lock className="w-4 h-4" />

              <span className="text-sm">Link de alteração de senha</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
