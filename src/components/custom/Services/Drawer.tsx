import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import {
  CalendarClock,
  Hourglass,
  LoaderCircle,
  LocateFixed,
  PenLine,
} from 'lucide-react'

export const Drawer = () => {
  const [method, setMethod] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [value, setValue] = useState('R$ 0,00')
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveService = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-sky-800 hover:bg-sky-900 text-gray-200 hover:text-gray-200 rounded-full flex gap-1 items-center">
          Adicionar novo serviço
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Adicionar novo serviço</SheetTitle>

          <SheetDescription>
            Para finalizar a criação do novo serviço, preencha os campos abaixo
            e clique em "Salvar".
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="service-name" className="text-right">
              Nome do serviço
            </Label>

            <Input
              id="service-name"
              className="col-span-3"
              placeholder="Ex: Lavagem de carro"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="value" className="text-right">
              Valor
            </Label>

            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onInput={(e) => {
                const currency =
                  Number(
                    (e.target as HTMLInputElement).value.replace(/[^\d]/g, '')
                  ) / 100

                ;(e.target as HTMLInputElement).value = currency.toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                )
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <Label className="text-right">Método de cobrança</Label>

            <Select value={method} onValueChange={(e) => setMethod(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método de cobrança" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="fixed">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <LocateFixed size={20} />
                      </div>
                      Fixo
                    </div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="hour">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <Hourglass size={20} />
                      </div>
                      Hora
                    </div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="day">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <CalendarClock size={20} />
                      </div>
                      Diária
                    </div>
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="custom">
                    <div className="flex items-center gap-2">
                      <div className="w-5">
                        <PenLine size={20} />
                      </div>
                      Customizado
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="text-gray-900 hover:bg-gray-200 rounded-full flex gap-1 items-center">
              Cancelar
            </Button>
          </SheetClose>

          {!isLoading ? (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-gray-200 rounded-full flex gap-1 items-center w-20"
              onClick={() => handleSaveService()}
            >
              Salvar
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-gray-200 rounded-full flex gap-1 items-center w-20"
              onClick={() => handleSaveService()}
              disabled
            >
              <LoaderCircle className="animate-spin" size={18} />
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
