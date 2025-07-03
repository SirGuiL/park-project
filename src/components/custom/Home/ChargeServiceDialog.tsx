import { useState } from 'react'

import { LoaderCircle } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

export const ChargeServiceDialog = ({ isOpen, setIsOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar tag</DialogTitle>
            <DialogDescription>
              Crie uma nova tag para seus serviços.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder='Ex: "Lavagem"'
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>

              <Button
                className="w-16"
                type="submit"
                onClick={() => {
                  setIsLoading(true)
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Cobrar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}
