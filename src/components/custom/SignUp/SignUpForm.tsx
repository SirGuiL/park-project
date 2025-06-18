import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AccountService } from '@/services/AccountService'
import { UserService } from '@/services/UserService'
import toast from 'react-hot-toast'

type errorsType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  parkName: string
}

export const SignUpForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [parkName, setParkName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passInputOnFocus, setPassInputOnFocus] = useState(false)
  const [errors, setErrors] = useState<errorsType>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    parkName: '',
  })

  const handleGoToLogin = () => {
    window.location.href = '/entrar'
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let errorsCount = 0

    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      parkName: '',
    }

    if (firstName.trim() === '') {
      errorsCount++
      newErrors.firstName = 'Primeiro nome é obrigatório'
    }

    if (lastName.trim() === '') {
      errorsCount++
      newErrors.lastName = 'Sobrenome é obrigatório'
    }

    if (email.trim() === '') {
      errorsCount++
      newErrors.email = 'Email é obrigatório'
    }

    if (parkName.trim() === '') {
      errorsCount++
      newErrors.parkName = 'Nome do estacionamento é obrigatório'
    }

    if (password.trim() === '') {
      errorsCount++
      newErrors.password = 'Senha é obrigatória'
    }

    if (confirmPassword.trim() !== password.trim()) {
      errorsCount++
      newErrors.confirmPassword = 'As senhas não são iguais'
    }

    if (errorsCount > 0) {
      setErrors(newErrors)
      return
    }

    await createAccount()
  }

  const createAccount = async () => {
    try {
      const response = await AccountService.create({ name: parkName })

      await createUser(response.data.id)
    } catch (error) {
      toast.error('Erro ao criar conta', {
        position: 'top-right',
      })

      console.error(error)
    }
  }

  const createUser = async (accountId: string) => {
    try {
      await UserService.create({
        name: `${firstName} ${lastName}`,
        email,
        password,
        accountId,
        role: 'ADMIN',
      })

      handleGoToLogin()
    } catch (error) {
      toast.error('Erro ao criar usuário', {
        position: 'top-right',
      })

      console.error(error)
    }
  }

  useEffect(() => {
    if (firstName.trim() !== '') {
      setErrors((prevState) => ({
        ...prevState,
        firstName: '',
      }))
    }
  }, [firstName])

  useEffect(() => {
    if (lastName.trim() !== '') {
      setErrors((prevState) => ({
        ...prevState,
        lastName: '',
      }))
    }
  }, [lastName])

  useEffect(() => {
    if (email.trim() !== '') {
      setErrors((prevState) => ({
        ...prevState,
        email: '',
      }))
    }
  }, [email])

  useEffect(() => {
    if (password.trim() !== '') {
      setErrors((prevState) => ({
        ...prevState,
        password: '',
      }))
    }
  }, [password])

  return (
    <div className="flex flex-1 flex-col h-full p-10">
      <div>
        <h1 className="text-2xl font-semibold">sPark</h1>
      </div>

      <form
        onSubmit={handleSignUp}
        className="flex flex-col flex-1 justify-center gap-8"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Cadastro</h2>
          <small className="text-gray-700">
            Vamos começar criando sua conta
          </small>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex-col flex-1">
              <Label htmlFor="firstName">Primeiro nome</Label>
              <Input
                id="firstName"
                placeholder="Digite seu primeiro nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <small className="text-red-500">{errors.firstName}</small>
              )}
            </div>

            <div className="flex-col flex-1">
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                id="lastName"
                placeholder="Digite seu sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <small className="text-red-500">{errors.lastName}</small>
              )}
            </div>
          </div>

          <div className="flex-col flex-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email}</small>
            )}
          </div>

          <div className="flex-col flex-1">
            <Label htmlFor="parkName">Nome do estacionamento</Label>
            <Input
              id="parkName"
              placeholder="Digite o nome do seu estacionamento"
              value={parkName}
              onChange={(e) => setParkName(e.target.value)}
            />
            {errors.parkName && (
              <small className="text-red-500">{errors.parkName}</small>
            )}
          </div>

          <div className="flex-col flex-1">
            <Label htmlFor="password">Senha</Label>

            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassInputOnFocus(true)}
              onBlur={() => setPassInputOnFocus(false)}
            />

            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}

            {passInputOnFocus && (
              <div className="mt-4 flex flex-col">
                <small className={password.length < 8 ? '' : 'text-green-500'}>
                  - Ao menos 8 dígitos
                </small>
                <small className={!/\d/.test(password) ? '' : 'text-green-500'}>
                  - Ao menos um número
                </small>
                <small
                  className={!/[A-Z]/.test(password) ? '' : 'text-green-500'}
                >
                  - Ao menos uma letra maiúscula
                </small>
                <small
                  className={!/[a-z]/.test(password) ? '' : 'text-green-500'}
                >
                  - Ao menos uma letra minúscula
                </small>
                <small
                  className={
                    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
                      ? ''
                      : 'text-green-500'
                  }
                >
                  - Ao menos um caractere especial
                </small>
              </div>
            )}
          </div>

          <div className="flex-col flex-1">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <small className="text-red-500">{errors.confirmPassword}</small>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button
            type="submit"
            className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-lg h-12 flex gap-1 items-center mt-1"
          >
            <span>Criar conta</span>
          </Button>

          <small>
            Já tem uma conta?{' '}
            <a
              className="text-sky-500 cursor-pointer hover:text-sky-700 transition-colors duration-200"
              onClick={handleGoToLogin}
            >
              Clique aqui
            </a>
          </small>
        </div>
      </form>
    </div>
  )
}
