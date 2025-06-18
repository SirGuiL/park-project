import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthService } from '@/services/AuthService'

type errorsType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  parkName: string
}

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<errorsType>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    parkName: '',
  })

  const handleGoToSignUp = () => {
    window.location.href = '/cadastro'
  }

  const handleGoToForgotPassword = () => {
    window.location.href = '/recuperar-senha'
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

    if (email.trim() === '') {
      errorsCount++
      newErrors.email = 'Email é obrigatório'
    }

    if (password.trim() === '') {
      errorsCount++
      newErrors.password = 'Senha é obrigatória'
    }

    if (errorsCount > 0) {
      setErrors(newErrors)
      return
    }

    login()
  }

  const login = async () => {
    try {
      const response = await AuthService.login({ email, password })

      console.log(response.data)
      toast.success('Usuário logado com sucesso!', {
        position: 'top-right',
      })
    } catch (error) {
      console.error(error)

      toast.error('E-mail ou senha inválidos', {
        position: 'top-right',
      })
    }
  }

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
          <h2 className="text-2xl font-semibold">Login</h2>
          <small className="text-gray-700">
            Vamos acessar sua conta na sPark!
          </small>
        </div>

        <div className="flex flex-col gap-4">
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
            <Label htmlFor="password">Senha</Label>

            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}
          </div>

          <a
            className="text-gray-500 text-xs cursor-pointer"
            onClick={handleGoToForgotPassword}
          >
            Esqueceu sua senha?
          </a>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button
            type="submit"
            className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-lg h-12 flex gap-1 items-center mt-1"
          >
            <span>Entrar</span>
          </Button>

          <small>
            Ainda não tem uma conta?{' '}
            <a
              className="text-sky-500 cursor-pointer hover:text-sky-700 transition-colors duration-200"
              onClick={handleGoToSignUp}
            >
              Cadastre-se aqui
            </a>
          </small>
        </div>
      </form>
    </div>
  )
}
