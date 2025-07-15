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
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Ellipsis, Plus } from 'lucide-react'
import { DeleteUserDialog, EditUserDialog, Menu } from '.'

import { useAccount } from '@/hooks/useAccount'
import { Role } from '@/DTOs/user'
import { useState } from 'react'
import { UserService } from '@/services/UserService'
import { useUser } from '@/hooks/useUser'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { AccountService } from '@/services/AccountService'
import { hasCachedPage } from '@/lib/utils'

type AccountUsersProps = {
  openUsersDrawer: () => void
  fetchUsers: () => void
}

type editUserData = {
  email: string
  name: string
}

export const AccountUsers = (props: AccountUsersProps) => {
  const { openUsersDrawer, fetchUsers } = props

  const [selectedId, setSelectedId] = useState('')
  const [deleteUserDialog, setDeleteUserDialog] = useState(false)
  const [editUserDialog, setEditUserDialog] = useState(false)

  const {
    accountUsers,
    page,
    maxPages,
    setPage,
    saveStoredMaxPages,
    saveStoredAccountUsers,
  } = useAccount()
  const { user: currentUser } = useUser()

  const paginatedUsers = accountUsers.slice((page - 1) * 10, page * 10)

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

  const handleEdit = (id: string) => {
    setSelectedId(id)
    setEditUserDialog(true)
  }

  const editUser = async (data: editUserData) => {
    const { email, name } = data
    try {
      await UserService.update({
        email,
        name,
        id: selectedId,
      })
    } catch (error) {
      console.error(error)
    } finally {
      fetchUsers()
    }
  }

  const handleDelete = (id: string) => {
    setSelectedId(id)
    setDeleteUserDialog(true)
  }

  const deleteUser = async () => {
    setDeleteUserDialog(false)

    try {
      await UserService.delete({ id: selectedId })
    } catch (error) {
      console.error(error)
    } finally {
      fetchUsers()
    }
  }

  const setCurrentPage = async (page: number) => {
    setPage(page)

    const alreadySearched = hasCachedPage({
      cachedItems: accountUsers,
      page,
    })

    if (alreadySearched) return

    const limit = 10

    try {
      const response = await AccountService.getUsers({
        page,
        limit,
        query: '',
      })

      saveStoredMaxPages(Math.ceil(response.data.metadata.count / limit))

      if (page === 1) {
        saveStoredAccountUsers(response.data.users)
        return
      }

      saveStoredAccountUsers(accountUsers.concat(response.data.users))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
      <div className="flex flex-col">
        <h1 className="text-base">Funcionários</h1>
        <h2 className="text-gray-500 text-sm">Gerencie seus funcionários</h2>
      </div>

      <div className="w-full">
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
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatRole(user.role)}</TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  {user.id !== currentUser.id && (
                    <Menu
                      trigger={
                        <Button
                          variant="secondary"
                          size="icon"
                          className="size-8 bg-transparent"
                        >
                          <Ellipsis />
                        </Button>
                      }
                      handleDelete={() => handleDelete(user.id)}
                      handleEdit={() => handleEdit(user.id)}
                      copyUpdatePasswordLink={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/nova-senha/${user.id}`
                        )
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <Button variant="default" onClick={() => openUsersDrawer()}>
                  <Plus />

                  <span>Novo usuário</span>
                </Button>
              </TableCell>

              <TableCell className="text-right">
                <div className="max-w-[350px] self-end ml-auto">
                  {maxPages > 1 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            disabled={page === 1}
                            onClick={() => setCurrentPage(page - 1)}
                          >
                            <ChevronLeft />
                            Anterior
                          </Button>
                        </PaginationItem>

                        {page > 1 && (
                          <PaginationItem
                            className="cursor-pointer"
                            onClick={() => setCurrentPage(page - 1)}
                          >
                            <PaginationLink>{page - 1}</PaginationLink>
                          </PaginationItem>
                        )}

                        <PaginationItem className="cursor-pointer">
                          <PaginationLink isActive>{page}</PaginationLink>
                        </PaginationItem>

                        {maxPages > page && (
                          <PaginationItem
                            className="cursor-pointer"
                            onClick={() => setCurrentPage(page + 1)}
                          >
                            <PaginationLink>{page + 1}</PaginationLink>
                          </PaginationItem>
                        )}

                        <PaginationItem>
                          <Button
                            variant="ghost"
                            disabled={page === maxPages}
                            onClick={() => setCurrentPage(page + 1)}
                          >
                            Próximo
                            <ChevronRight />
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <DeleteUserDialog
        dialogState={deleteUserDialog}
        setDialogState={setDeleteUserDialog}
        handleDeleteUser={deleteUser}
      />

      <EditUserDialog
        dialogState={editUserDialog}
        setDialogState={setEditUserDialog}
        handleUpdateUser={editUser}
        email={accountUsers.find((user) => user.id === selectedId)?.email || ''}
        name={accountUsers.find((user) => user.id === selectedId)?.name || ''}
      />
    </div>
  )
}
