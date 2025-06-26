import { ReactNode, useEffect, useState } from 'react'

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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { formatCentsToBRL } from '@/lib/utils'

type handleUpdateServiceType = {
  amount: number
  name: string
}

type errorType = {
  name: string
  amount: string
}

type Props = {
  trigger: ReactNode
  handleUpdateService: ({ amount, name }: handleUpdateServiceType) => void
  amount: string
  name: string
  dialogState: boolean
  setDialogState: (state: boolean) => void
}

export const EditServiceDialog = (props: Props) => {
  const {
    handleUpdateService,
    trigger,
    amount,
    name,
    dialogState,
    setDialogState,
  } = props

  const [value, setValue] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [errors, setErrors] = useState<errorType>({ name: '', amount: '' })

  const onSubmitForm = () => {
    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    handleUpdateService({
      amount: Number(value.replace(',', '.').replace(/[^\d.]/g, '')),
      name: serviceName,
    })

    setDialogState(false)
  }

  const validateForm = () => {
    let errors = 0

    if (serviceName.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        name: 'O nome do serviço é obrigatório',
      }))
      errors++
    }

    if (
      Number(value.replace(',', '.').replace(/[^\d.]/g, '')) == 0 ||
      isNaN(Number(value.replace(',', '.').replace(/[^\d.]/g, '')))
    ) {
      setErrors((prev) => ({
        ...prev,
        amount: 'O valor deve ser maior que zero',
      }))
      errors++
    }

    return { errors }
  }

  useEffect(() => {
    setValue(amount)
    setServiceName(name)

    setErrors({ name: '', amount: '' })
  }, [amount, name])

  useEffect(() => {
    if (serviceName.trim() !== '') {
      setErrors((prev) => ({
        ...prev,
        name: '',
      }))
    }
  }, [serviceName])

  useEffect(() => {
    if (
      Number(value.replace(',', '.').replace(/[^\d.]/g, '')) > 0 &&
      !isNaN(Number(value.replace(',', '.').replace(/[^\d.]/g, '')))
    ) {
      setErrors((prev) => ({
        ...prev,
        amount: '',
      }))
    }
  }, [value])

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar serviço</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja editar esse serviço? <br />
              Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div>
              <div className="grid gap-3">
                <Label htmlFor="service-name">Nome do serviço</Label>
                <Input
                  id="service-name"
                  name="service-name"
                  onChange={(e) => setServiceName(e.target.value)}
                  value={serviceName}
                />
              </div>

              {errors.name && (
                <small className="text-red-500">{errors.name}</small>
              )}
            </div>

            <div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  name="amount"
                  onChange={(e) => setValue(e.target.value)}
                  onInput={(e) => {
                    ;(e.target as HTMLInputElement).value = formatCentsToBRL(
                      Number(
                        (e.target as HTMLInputElement).value.replace(
                          /[^\d]/g,
                          ''
                        )
                      )
                    )
                  }}
                  value={value}
                />
              </div>

              {errors.amount && (
                <small className="text-red-500">{errors.amount}</small>
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
