import { useState } from 'react'
// import { add } from 'date-fns'
import toast from 'react-hot-toast'

import {
  AccountSettings,
  AccountUsers,
  AddUsersDrawer,
  Header,
  InactiveUserDialog,
  UserPreferences,
  UserSettings,
} from '@/components/custom/Settings'
import { Badge } from '@/components/ui/badge'

import { useAccount } from '@/hooks/useAccount'
import { useUser } from '@/hooks/useUser'

import { AccountService } from '@/services/AccountService'
import { UserService } from '@/services/UserService'
import { Info } from 'lucide-react'

export const Settings = () => {
  const [selectedStep, setSelectedStep] = useState<'user' | 'account'>('user')
  const [usersDrawerOpen, setUsersDrawerOpen] = useState(false)
  const [inactiveUserDialogOpen, setInactiveUserDialogOpen] = useState(false)
  const [isLoadingUpdatePassword, setIsLoadingUpdatePassword] = useState(false)

  const { user } = useUser()
  const { saveStoredAccountUsers } = useAccount()

  const updateTwoFactorVerification = (value: boolean) => {
    console.log(value)
  }

  const updatePassword = async () => {
    try {
      setIsLoadingUpdatePassword(true)
      await UserService.sendUpdatePasswordLink()

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-[600px] w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Link de redefinição de senha enviado no e-mail {user.email}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    O link é válido por 15 minutos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          position: 'top-right',
          duration: 20000,
        }
      )
    } catch (error) {
      console.error(error)

      toast.error('Erro ao gerar o link de redefinição de senha')
    } finally {
      setIsLoadingUpdatePassword(false)
    }
  }

  const handleInactivateUser = async () => {
    setInactiveUserDialogOpen(false)

    try {
      await UserService.inactive({ id: user.id })

      window.location.href = '/entrar'
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await AccountService.getUsers()

      saveStoredAccountUsers(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <Header />

      <div className="flex flex-col overflow-y-auto">
        <div className="p-5">
          <h1 className="font-bold text-xl">Configurações</h1>
          <h2 className="text-gray-500 text-base">
            Gerencie suas configurações e preferências
          </h2>
        </div>

        <div className="flex w-full gap-2 px-5 py-1">
          <Badge
            variant="outline"
            className={`rounded-xl cursor-pointer ${
              selectedStep === 'user' ? 'bg-gray-200' : ''
            }`}
            onClick={() => setSelectedStep('user')}
          >
            <span className="text-sm">Usuário</span>
          </Badge>

          <Badge
            variant="outline"
            className={`rounded-xl cursor-pointer ${
              selectedStep === 'account' ? 'bg-gray-200' : ''
            }`}
            onClick={() => setSelectedStep('account')}
          >
            <span className="text-sm">Estacionamento</span>
          </Badge>
        </div>

        {selectedStep === 'user' ? (
          <>
            <UserSettings />

            <UserPreferences
              handleUpdateTwoFactor={updateTwoFactorVerification}
              handleUpdatePassword={updatePassword}
              isLoadingUpdatePassword={isLoadingUpdatePassword}
              handleInactivateUser={() => setInactiveUserDialogOpen(true)}
            />
          </>
        ) : (
          <>
            <AccountSettings />
            <AccountUsers
              openUsersDrawer={() => setUsersDrawerOpen(true)}
              fetchUsers={fetchUsers}
            />
            <AddUsersDrawer
              open={usersDrawerOpen}
              onOpenChange={setUsersDrawerOpen}
              fetchUsers={fetchUsers}
            />
          </>
        )}
      </div>

      <InactiveUserDialog
        dialogState={inactiveUserDialogOpen}
        setDialogState={setInactiveUserDialogOpen}
        handleInactiveUser={handleInactivateUser}
      />
    </div>
  )
}
