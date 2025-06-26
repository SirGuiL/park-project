import { useState } from 'react'

import {
  AccountSettings,
  AccountUsers,
  Header,
  UserPreferences,
  UserSettings,
} from '@/components/custom/Settings'
import { Badge } from '@/components/ui/badge'

export const Settings = () => {
  const [selectedStep, setSelectedStep] = useState<'user' | 'account'>('user')

  const updateTwoFactorVerification = (value: boolean) => {
    console.log(value)
  }

  const updatePassword = () => {
    console.log('updatePassword')
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
            />
          </>
        ) : (
          <>
            <AccountSettings />
            <AccountUsers />
          </>
        )}
      </div>
    </div>
  )
}
