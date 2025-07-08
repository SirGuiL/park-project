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
  handleInactiveUser: () => void
  dialogState: boolean
  setDialogState: (state: boolean) => void
}

export const InactiveUserDialog = (props: props) => {
  const { handleInactiveUser, dialogState, setDialogState } = props

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Desativar usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja desativar seu usuário? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button
              onClick={handleInactiveUser}
              className="bg-red-700 hover:bg-red-800"
            >
              Desativar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
