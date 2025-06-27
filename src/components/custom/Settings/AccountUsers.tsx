import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAccount } from '@/hooks/useAccount'
import { Button } from '@/components/ui/button'
import { Ellipsis, Plus } from 'lucide-react'
import { Role } from '@/DTOs/user'

type AccountUsersProps = {
  openUsersDrawer: () => void
}

export const AccountUsers = (props: AccountUsersProps) => {
  const { openUsersDrawer } = props

  const { accountUsers } = useAccount()

  const formatRole = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador'
      case 'USER':
        return 'Usuário'
      default:
        break
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
      <div className="flex flex-col">
        <h1 className="text-base">Funcionários</h1>
        <h2 className="text-gray-500 text-sm">Gerencie seus funcionários</h2>
      </div>

      <div className="w-full max-h-80 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatRole(user.role)}</TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 bg-transparent"
                  >
                    <Ellipsis />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <span>
                  Total: {accountUsers.length} usuário
                  {accountUsers.length > 1 ? 's' : ''}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="default" onClick={() => openUsersDrawer()}>
                  <Plus />

                  <span>Novo usuário</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
