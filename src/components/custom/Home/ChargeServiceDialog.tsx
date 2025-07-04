import { FormEvent, useState } from 'react'
import PixIcon from '../icons/pix.svg'

import { Banknote, CreditCard, LoaderCircle } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { formatCentsToBRL } from '@/lib/utils'

type Props = {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

type paymentMethod = 'credit' | 'debit' | 'pix' | 'cash'
type valueMethod = 'hour' | 'day' | 'precision'

type errorType = {
  value: string
}

export const ChargeServiceDialog = ({ isOpen, setIsOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<paymentMethod>('pix')
  const [valueMethod, setValueMethod] = useState<valueMethod>('hour')
  const [value, setValue] = useState('R$ 0,00')
  const [errors, setErrors] = useState<errorType>({ value: '' })

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setErrors({ value: '' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalizar serviço</DialogTitle>
            <DialogDescription>
              Vamos finalizar o serviço e cobrar o valor.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-8" onSubmit={handleSubmitForm}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Método de pagamento</Label>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(e: paymentMethod) => setPaymentMethod(e)}
                defaultValue="cars"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="pix" id="r1" />
                  <Label className="flex items-center gap-2" htmlFor="r1">
                    <div className="max-w-5 max-h-5 p-[2px]">
                      <img src={PixIcon} alt="" className="w-full h-full" />
                    </div>
                    Pix
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="cash" id="r2" />
                  <Label className="flex items-center gap-2" htmlFor="r2">
                    <Banknote className="max-w-5 max-h-5" />
                    Dinheiro
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="credit" id="r3" />
                  <Label className="flex items-center gap-2" htmlFor="r3">
                    <CreditCard className="max-w-5 max-h-5" />
                    Cartão de crédito
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="debit" id="r4" />
                  <Label className="flex items-center gap-2" htmlFor="r4">
                    <CreditCard className="max-w-5 max-h-5" />
                    Cartão de débito
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Método de cobrança</Label>

              <RadioGroup
                className="flex gap-4"
                value={valueMethod}
                onValueChange={(e: valueMethod) => setValueMethod(e)}
                defaultValue="cars"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="hour" id="hour" />
                  <Label htmlFor="hour">Por hora</Label>
                </div>

                <div className="flex items-center gap-1">
                  <RadioGroupItem value="day" id="day" />
                  <Label htmlFor="day">Por dia</Label>
                </div>

                <div className="flex items-center gap-1">
                  <RadioGroupItem value="precision" id="precision" />
                  <Label htmlFor="precision">Valor customizado</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Valor</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onInput={(e) => {
                  ;(e.target as HTMLInputElement).value = formatCentsToBRL(
                    Number(
                      (e.target as HTMLInputElement).value.replace(/[^\d]/g, '')
                    )
                  )
                }}
                disabled={valueMethod !== 'precision'}
              />
              {errors.value && (
                <small className="text-red-500">{errors.value}</small>
              )}
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
