import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { isValidPassword } from '@/lib/utils'
import { UserService } from '@/services/UserService'
import { LoaderCircle } from 'lucide-react'
import toast from 'react-hot-toast'

type errorsType = {
  password: string
  confirmPassword: string
}

export const CreatePasswordForm = ({ userId }: { userId: string }) => {
  const [passInputOnFocus, setPassInputOnFocus] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<errorsType>({
    password: '',
    confirmPassword: '',
  })

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setIsLoading(true)

    try {
      await UserService.updatePassword({
        id: userId,
        password,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      toast.success(
        'Senha atualizada com sucesso, redirecionando para tela de login',
        {
          position: 'top-right',
        }
      )

      setTimeout(() => {
        window.location.href = '/entrar'
      }, 8000)
    }
  }

  const validateForm = () => {
    let errors = 0

    if (password.trim() === '') {
      setErrors((prev) => ({ ...prev, password: 'A senha é obrigatória' }))
      errors++
    }

    if (password.trim() !== '' && !isValidPassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: 'A senha não segue as regras de segurança',
      }))
      errors++
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'As senhas devem ser iguais',
      }))
      errors++
    }

    return { errors }
  }

  useEffect(() => {
    if (
      isValidPassword(password) &&
      errors.password === 'A senha não segue as regras de segurança'
    ) {
      setErrors((prev) => ({ ...prev, password: '' }))
    }

    if (
      errors.password === 'A senha é obrigatória' &&
      !isValidPassword(password) &&
      password.trim() !== ''
    ) {
      setErrors((prev) => ({
        ...prev,
        password: 'A senha não segue as regras de segurança',
      }))
    }
  }, [password, errors.password])

  useEffect(() => {
    setErrors((prev) => ({ ...prev, confirmPassword: '' }))
  }, [confirmPassword])

  return (
    <div className="flex flex-1 flex-col h-full p-10">
      <div>
        <h1 className="text-2xl font-semibold">sPark</h1>
      </div>

      <form
        onSubmit={handleCreatePassword}
        className="flex flex-col flex-1 justify-center gap-8"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Nova senha</h2>
          <small className="text-gray-700">
            Vamos criar uma senha para a sua conta na sPark!
          </small>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-col flex-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua nova senha"
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
            <Label htmlFor="confirmPassword">Confirmação de Senha</Label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errors.confirmPassword && (
              <small className="text-red-500">{errors.confirmPassword}</small>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <span>Concluir</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
