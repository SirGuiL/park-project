import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export const UserPreferences = () => {
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="flex flex-col md:flex-row w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
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
          color="indigo"
        />
      </form>
    </div>
  )
}
