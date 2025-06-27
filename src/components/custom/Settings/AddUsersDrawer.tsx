import { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { LoaderCircle } from 'lucide-react'

import { UserService } from '@/services/UserService'
import { useAccount } from '@/hooks/useAccount'

type AddUsersDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  fetchUsers: () => void
}

type errorType = {
  name: string
  email: string
  role: string
}

export const AddUsersDrawer = (props: AddUsersDrawerProps) => {
  const { onOpenChange, open, fetchUsers } = props
  const { account } = useAccount()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<errorType>({
    name: '',
    email: '',
    role: '',
  })

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setIsLoading(true)

    try {
      await UserService.create({
        name,
        email,
        accountId: account.id,
        role: role as 'ADMIN' | 'USER',
        password: '',
      })

      setName('')
      setEmail('')
      setRole('')

      toast.success('Usuário criado com sucesso', {
        position: 'top-right',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      fetchUsers()
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

    if (role == '') {
      setErrors((prev) => ({ ...prev, role: 'O cargo é obrigatório' }))
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

  useEffect(() => {
    if (role.trim() !== '') {
      setErrors((prev) => ({ ...prev, role: '' }))
    }
  }, [role])

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader className="flex flex-col gap-0">
          <SheetTitle>Adicionar funcionário</SheetTitle>
          <SheetDescription style={{ marginTop: 0 }}>
            Adicione um novo funcionário ao sistema
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name-input">Nome</Label>
            <div>
              <Input
                id="name-input"
                placeholder="João da Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="text-red-500">{errors.name}</small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email-input">E-mail</Label>

            <div>
              <Input
                id="email-input"
                placeholder="js@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="role-input">Cargo</Label>

            <div>
              <Select value={role} onValueChange={(e) => setRole(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem className="cursor-pointer" value="ADMIN">
                      <div className="flex items-center gap-2">
                        Administrador
                      </div>
                    </SelectItem>

                    <SelectItem className="cursor-pointer" value="USER">
                      <div className="flex items-center gap-2">Funcionário</div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.role && (
                <small className="text-red-500">{errors.role}</small>
              )}
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancelar</Button>
            </SheetClose>

            <Button type="submit" className="w-36">
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Adicionar usuário'
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
