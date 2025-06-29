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
  handleCreateTag: ({ name }: { name: string }) => void
  dialogState: boolean
  setDialogState: (state: boolean) => void
}

type errorType = {
  name: string
}

export const CreateTagDialog = (props: props) => {
  const { handleCreateTag, dialogState, setDialogState } = props

  const [name, setName] = useState('')
  const [errors, setErrors] = useState<errorType>({ name: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setIsLoading(true)
    handleCreateTag({ name })
  }

  const validateForm = () => {
    let errors = 0

    if (name.trim() === '') {
      setErrors((prev) => ({ ...prev, name: 'O nome é obrigatório' }))
      errors++
    }

    return { errors }
  }

  useEffect(() => {
    setName('')
    setErrors({ name: '' })
    setIsLoading(false)
  }, [dialogState])

  useEffect(() => {
    if (name.trim() !== '') {
      setErrors((prev) => ({ ...prev, name: '' }))
    }
  }, [name])

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar tag</DialogTitle>
            <DialogDescription>
              Crie uma nova tag para seus serviços.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitForm} className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder='Ex: "Lavagem"'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="text-red-500">{errors.name}</small>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>

              <Button className="w-16" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Criar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}
