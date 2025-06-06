import { FormEvent, ReactNode, useState } from 'react'

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
import {
  CalendarClock,
  Hourglass,
  LoaderCircle,
  LocateFixed,
  PenLine,
  Plus,
} from 'lucide-react'
import { TagsList } from './TagsList'
import { useTags } from '@/hooks/useTags'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { tagType } from '@/DTOs/tag'
import { useServices } from '@/hooks/useServices'
import { formatCentsToBRL } from '@/lib/utils'

interface DrawerProps {
  trigger?: ReactNode
}

export const Drawer = ({ trigger }: DrawerProps) => {
  const [method, setMethod] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [value, setValue] = useState('R$ 0,00')
  const [isLoading, setIsLoading] = useState(false)
  const [tagsSerch, setTagsSerch] = useState('')
  const [selectedTags, setSelectedTags] = useState<tagType[]>([])

  const { filteredTags, createTag, findTagById } = useTags()
  const { createService } = useServices()

  const tagsFiltered = filteredTags(tagsSerch)
  const selectedTagsFormatted = selectedTags.map((tag) => tag.name).join(', ')

  const handleSaveService = () => {
    setIsLoading(true)

    const service = {
      name: serviceName,
      amount: Number(value.replace(',', '.').replace(/[^\d.]/g, '')),
      method: method,
      tags: selectedTags,
    }

    createService(service)

    setIsLoading(false)

    document.getElementById('close-service')?.click()
  }

  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createTag(tagsSerch)
  }

  const setTags = (e: string) => {
    const tag = findTagById(e)

    if (tag) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button
            className="bg-sky-800 hover:bg-sky-900 text-gray-200 hover:text-gray-200 rounded-full flex gap-1 items-center"
            id="add-service"
          >
            Adicionar novo serviço
          </Button>
        )}
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
                ;(e.target as HTMLInputElement).value = formatCentsToBRL(
                  Number(
                    (e.target as HTMLInputElement).value.replace(/[^\d]/g, '')
                  )
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

          <div className="flex flex-col items-start gap-1">
            <Label className="text-right">Tags</Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full">
                  <Input
                    id="tags-search"
                    defaultValue={selectedTagsFormatted}
                    placeholder='Ex: "Lavagem"'
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-[335px]">
                <DropdownMenuLabel>
                  <form
                    className="flex gap-1"
                    onSubmit={(e) => handleAddTag(e)}
                  >
                    <Input
                      className="placeholder:text-gray-600 placeholder:text-sm placeholder:font-normal"
                      id="tags-search"
                      value={tagsSerch}
                      onChange={(e) => setTagsSerch(e.target.value)}
                      placeholder='Ex: "Lavagem"'
                    />

                    {tagsFiltered.length == 0 &&
                      tagsSerch.trim().length > 0 && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-gray-200 rounded-xl flex gap-1 items-center">
                          <Plus size={16} />
                        </Button>
                      )}
                  </form>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <TagsList tagsSerch={tagsSerch} setTag={setTags} />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              className="text-gray-900 hover:bg-gray-200 rounded-full flex gap-1 items-center"
              id="close-service"
            >
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
