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

type props = {
  trigger: ReactNode
  handleDeleteService: () => void
  dialogState: boolean
  setDialogState: (state: boolean) => void
}

export const DeleteServiceDialog = (props: props) => {
  const { trigger, handleDeleteService, dialogState, setDialogState } = props

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir serviço</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esse serviço? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button onClick={handleDeleteService}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
