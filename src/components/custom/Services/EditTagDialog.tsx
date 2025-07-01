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
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

type props = {
  handleEditTag: ({ name }: { name: string }) => void
  dialogState: boolean
  setDialogState: (state: boolean) => void
  name: string
}

type errorType = {
  name: string
}

export const EditTagDialog = (props: props) => {
  const { handleEditTag, dialogState, setDialogState, name } = props

  const [tagName, setTagName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<errorType>({ name: '' })

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setIsLoading(true)
    handleEditTag({
      name: tagName,
    })
  }

  const validateForm = () => {
    let errors = 0

    if (tagName.trim() === '') {
      setErrors((prev) => ({ ...prev, name: 'O nome é obrigatório' }))
      errors++
    }

    return { errors }
  }

  useEffect(() => {
    setIsLoading(false)
    setTagName(name)
  }, [dialogState, name])

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar tag</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja editar essa tag? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-8" onSubmit={onSubmitForm}>
            <div>
              <Label htmlFor="name">Nome da tag</Label>
              <Input
                id="name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
              {errors.name && (
                <small className="text-red-500">{errors.name}</small>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>

              <Button className="w-20" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Editar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}
