import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'

interface RemoveCarModalProps {
  trigger: ReactNode
  accept: () => void
}

export const RemoveCarModal = ({ trigger, accept }: RemoveCarModalProps) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white gap-8">
          <DialogHeader className="gap-2">
            <DialogTitle>Remover lançamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover esse lançamento? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="hover:bg-gray-100 text-gray-800 rounded-full flex gap-1 items-center border-2 border-gray-100">
                <span>Cancelar</span>
              </Button>
            </DialogClose>

            <Button
              className="bg-red-500 hover:bg-red-600 text-gray-200 rounded-full flex gap-1 items-center"
              onClick={accept}
            >
              <Trash2 color="#e5e7eb" size={18} strokeWidth={2} />

              <span>Remover</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
