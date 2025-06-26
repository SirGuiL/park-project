import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

import { useAccount } from '@/hooks/useAccount'
import { formatCNPJ, verifyCNPJ } from '@/lib/utils'
import { AccountService } from '@/services/AccountService'

type errorType = {
  name: string
  cnpj: string
}

export const AccountSettings = () => {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [errors, setErrors] = useState<errorType>({ name: '', cnpj: '' })
  const [isLoading, setIsLoading] = useState(false)

  const { account, saveStoredAccount } = useAccount()

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setErrors({ name: '', cnpj: '' })
    setIsLoading(true)

    try {
      await AccountService.update({
        name,
        cnpj: cnpj.trim().replace(/[^0-9#*]/g, ''),
        id: account.id,
      })

      getAccount()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    let errors = 0

    if (name.trim() === '') {
      setErrors((prev) => ({ ...prev, name: 'O nome é obrigatório' }))
      errors++
    }

    if (cnpj.trim() !== '' && !verifyCNPJ(cnpj.trim())) {
      setErrors((prev) => ({ ...prev, cnpj: 'CNPJ inválido' }))
      errors++
    }

    return { errors }
  }

  const getAccount = async () => {
    try {
      const response = await AccountService.get()

      saveStoredAccount(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (name.trim() !== '') {
      setErrors((prev) => ({ ...prev, name: '' }))
    }
  }, [name])

  useEffect(() => {
    if (cnpj.trim() !== '') {
      setErrors((prev) => ({ ...prev, cnpj: '' }))
    }
  }, [cnpj])

  useEffect(() => {
    setName(account.name)

    if (account.cnpj) setCnpj(formatCNPJ(account.cnpj))
  }, [account.name, account.cnpj])

  return (
    <div className="flex flex-col md:flex-row w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
      <div className="flex flex-col">
        <h1 className="text-base">Estacionamento</h1>
        <h2 className="text-gray-500 text-sm">
          Gerencie suas configurações e preferências
        </h2>
      </div>

      <form
        className="flex flex-col gap-2 w-full md:w-1/2"
        onSubmit={handleSubmitForm}
      >
        <div className="flex-col flex-1">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />

          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        <div className="flex-col flex-1">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            placeholder="Digite seu CNPJ"
            maxLength={18}
            value={cnpj}
            onChange={(e) =>
              setCnpj(formatCNPJ(e.target.value.replace(/[^0-9#*]/g, '')))
            }
            disabled={isLoading}
          />

          {errors.cnpj && <small className="text-red-500">{errors.cnpj}</small>}
        </div>

        <Button
          className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-sm md:rounded-full flex gap-1 items-center self-end w-full md:w-[70px]"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <span>Salvar</span>
          )}
        </Button>
      </form>
    </div>
  )
}
