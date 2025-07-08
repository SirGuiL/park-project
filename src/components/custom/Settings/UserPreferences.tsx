import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { LoaderCircle } from 'lucide-react'

type UserPreferencesProps = {
  handleInactivateUser: () => void
  handleUpdatePassword: () => void
  handleUpdateTwoFactor: (twoFactor: boolean) => void
  isLoadingUpdatePassword: boolean
}

export const UserPreferences = (props: UserPreferencesProps) => {
  const {
    handleUpdatePassword,
    handleUpdateTwoFactor,
    handleInactivateUser,
    isLoadingUpdatePassword,
  } = props

  const [twoFactor, setTwoFactor] = useState(false)

  const submitUpdatePasswordForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleUpdatePassword()
  }

  const onSubmitInactiveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleInactivateUser()
  }

  useEffect(() => {
    handleUpdateTwoFactor(twoFactor)
  }, [twoFactor, handleUpdateTwoFactor])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
        <div className="flex flex-col">
          <h1 className="text-base">Autenticação de dois fatores</h1>
          <h2 className="text-gray-500 text-sm">
            Torne sua conta mais segura com autenticação de dois fatores
          </h2>
        </div>

        <form>
          <Switch
            id="airplane-mode"
            checked={twoFactor}
            onClick={() => setTwoFactor(!twoFactor)}
          />
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
        <div className="flex flex-col">
          <h1 className="text-base">Alterar senha</h1>
          <h2 className="text-gray-500 text-sm">
            Alterar a senha do meu usuário
          </h2>
        </div>

        <form onSubmit={submitUpdatePasswordForm}>
          <Button className="w-full md:w-32" disabled={isLoadingUpdatePassword}>
            {isLoadingUpdatePassword ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <span>Alterar senha</span>
            )}
          </Button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
        <div className="flex flex-col">
          <h1 className="text-base">Desativar conta</h1>
          <h2 className="text-gray-500 text-sm">
            Essa ação não pode ser desfeita
          </h2>
        </div>

        <form onSubmit={onSubmitInactiveUser}>
          <Button className="w-full md:w-auto bg-red-600 hover:bg-red-700">
            <span>Desativar conta</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
