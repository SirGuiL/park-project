import { ReactNode, useEffect, useState } from 'react'

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
import { ChevronsUpDown, LoaderCircle, Plus } from 'lucide-react'
import { useTags } from '@/hooks/useTags'
import { tagType } from '@/DTOs/tag'
import { useServices } from '@/hooks/useServices'
import { formatCentsToBRL } from '@/lib/utils'
import { TagsService } from '@/services/TagsService'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DrawerProps {
  trigger?: ReactNode
}

export const Drawer = ({ trigger }: DrawerProps) => {
  const [serviceName, setServiceName] = useState('')
  const [value, setValue] = useState('R$ 0,00')
  const [isLoading, setIsLoading] = useState(false)
  const [tagsSerch, setTagsSerch] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { tags, createTag, setStoredTags } = useTags()
  const { createService } = useServices()

  const formattedTags = tags.map((tag) => {
    return {
      value: tag.id,
      label: tag.name,
    }
  })

  const handleSaveService = () => {
    setIsLoading(true)

    const service = {
      name: serviceName,
      amount: Number(value.replace(',', '.').replace(/[^\d.]/g, '')),
      tags: tagsSerch.map((tag) => {
        return tags.find((t) => t.id === tag) as tagType
      }),
    }

    createService(service)

    setIsLoading(false)

    document.getElementById('close-service')?.click()
  }

  const handleAddTag = async () => {
    try {
      const response = await TagsService.create({
        name: search,
      })

      console.log(response.data)
      createTag({
        id: response.data.id,
        name: response.data.name,
        createdAt: response.data.createdAt,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await TagsService.get()
        setStoredTags(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTags()
  }, [setStoredTags])

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
            <Label className="text-right">Tags</Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {tagsSerch.length > 0
                    ? tagsSerch
                        .map((tag) => tags.find((t) => t.id === tag)?.name)
                        .join(', ')
                    : 'Selecione as tags'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[335px] p-0 bg-white">
                <div className="flex items-center p-1">
                  <Input
                    id="tags-search"
                    placeholder='Ex: "Lavagem de carro"'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />

                  {formattedTags.filter((tag) => tag.label.includes(search))
                    .length == 0 && (
                    <Button
                      className="bg-sky-800 hover:bg-sky-900 text-gray-200 flex gap-1 items-center"
                      onClick={handleAddTag}
                    >
                      <Plus color="#e5e7eb" size={18} strokeWidth={2} />
                    </Button>
                  )}
                </div>

                <div className="flex flex-col">
                  {formattedTags
                    .filter((tag) => tag.label.includes(search))
                    .map((tag) => (
                      <div
                        key={tag.value}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() =>
                          tagsSerch.includes(tag.value)
                            ? setTagsSerch(
                                tagsSerch.filter((t) => t !== tag.value)
                              )
                            : setTagsSerch([...tagsSerch, tag.value])
                        }
                      >
                        {tag.label}
                      </div>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
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
