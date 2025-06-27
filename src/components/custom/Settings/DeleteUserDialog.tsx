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

type props = {
  handleDeleteUser: () => void
  dialogState: boolean
  setDialogState: (state: boolean) => void
}

export const DeleteUserDialog = (props: props) => {
  const { handleDeleteUser, dialogState, setDialogState } = props

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esse usuário? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button onClick={handleDeleteUser}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
