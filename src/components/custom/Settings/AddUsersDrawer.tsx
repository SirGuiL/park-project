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
import { useState } from 'react'

type AddUsersDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddUsersDrawer = (props: AddUsersDrawerProps) => {
  const { onOpenChange, open } = props

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader className="flex flex-col gap-0">
          <SheetTitle>Adicionar funcionário</SheetTitle>
          <SheetDescription style={{ marginTop: 0 }}>
            Adicione um novo funcionário ao sistema
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name-input">Nome</Label>
            <Input
              id="name-input"
              placeholder="João da Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email-input">E-mail</Label>
            <Input
              id="email-input"
              placeholder="js@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="role-input">Cargo</Label>
            <Select value={role} onValueChange={(e) => setRole(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cargo" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="ADMIN">
                    <div className="flex items-center gap-2">Administrador</div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="USER">
                    <div className="flex items-center gap-2">Funcionário</div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>

          <Button type="submit">Adicionar usuário</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
