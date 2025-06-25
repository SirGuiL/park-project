import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { UserService } from '@/services/UserService'
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@/hooks/useUser'

type errorType = {
  name: string
  email: string
}

export const UserSettings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<errorType>({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useUser()

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setErrors({ name: '', email: '' })
    setIsLoading(true)

    try {
      await UserService.update({ name, email, id: user.id })
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

    if (email.trim() === '') {
      setErrors((prev) => ({ ...prev, email: 'O e-mail é obrigatório' }))
      errors++
    }

    return { errors }
  }

  useEffect(() => {
    if (name.trim() !== '') {
      setErrors((prev) => ({ ...prev, name: '' }))
    }
  }, [name])

  useEffect(() => {
    if (email.trim() !== '') {
      setErrors((prev) => ({ ...prev, email: '' }))
    }
  }, [email])

  return (
    <div className="flex flex-col md:flex-row w-full py-8 justify-between p-5 border-b-[1px] border-b-gray-400">
      <div className="flex flex-col">
        <h1 className="text-base">Usuário</h1>
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
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
        </div>

        <Button
          className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-full flex gap-1 items-center self-end w-[70px]"
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
