import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type handleUpdateUserType = {
  email: string
  name: string
}

type errorType = {
  name: string
  email: string
}

type Props = {
  handleUpdateUser: ({ email, name }: handleUpdateUserType) => void
  email: string
  name: string
  dialogState: boolean
  setDialogState: (state: boolean) => void
}

export const EditUserDialog = (props: Props) => {
  const { handleUpdateUser, email, name, dialogState, setDialogState } = props

  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [errors, setErrors] = useState<errorType>({ name: '', email: '' })

  const onSubmitForm = () => {
    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    handleUpdateUser({
      email: userEmail,
      name: userName,
    })

    setDialogState(false)
  }

  const validateForm = () => {
    let errors = 0

    if (userName.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        name: 'O nome do usuário é obrigatório',
      }))
      errors++
    }

    if (email.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        amount: 'O e-mail do usuário é obrigatório',
      }))
      errors++
    }

    return { errors }
  }

  useEffect(() => {
    setUserEmail(email)
    setUserName(name)

    setErrors({ name: '', email: '' })
  }, [email, name])

  useEffect(() => {
    if (userName.trim() !== '') {
      setErrors((prev) => ({
        ...prev,
        name: '',
      }))
    }
  }, [userName])

  useEffect(() => {
    if (userEmail.trim() !== '') {
      setErrors((prev) => ({
        ...prev,
        amount: '',
      }))
    }
  }, [userEmail])

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja editar esse usuário? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <div>
              <div className="grid gap-3">
                <Label htmlFor="user-name">Nome</Label>
                <Input
                  id="user-name"
                  name="user-name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>

              {errors.name && (
                <small className="text-red-500">{errors.name}</small>
              )}
            </div>

            <div>
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              {errors.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button onClick={() => onSubmitForm()}>Editar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
