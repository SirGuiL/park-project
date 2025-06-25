import { ReactNode, useEffect, useRef, useState } from 'react'

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
import { formatCentsToBRL } from '@/lib/utils'
import { TagsService } from '@/services/TagsService'
import { ServicesService } from '@/services/ServicesService'
import { useServices } from '@/hooks/useServices'

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

  const tagPopover = useRef(null)
  const tagButton = useRef(null)

  const { tags, createTag, setStoredTags } = useTags()
  const { setStoredServices } = useServices()

  const formattedTags = tags.map((tag) => {
    return {
      value: tag.id,
      label: tag.name,
    }
  })

  const handleSaveService = async () => {
    setIsLoading(true)

    try {
      await ServicesService.create({
        name: serviceName.trim(),
        amount: Number(value.replace(',', '.').replace(/[^\d.]/g, '')),
        tags: tagsSerch,
      })

      fetchServices()

      document.getElementById('close-service')?.click()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await ServicesService.fetchAll()

      setStoredServices(response.data)
    } catch (error) {
      console.error(error)
    }
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

  useEffect(() => {
    document.addEventListener('click', function (event) {
      if (!tagPopover.current || !tagButton.current) return

      if (
        // eslint-disable-next-line
        // @ts-ignore
        !tagPopover.current.contains(event.target) &&
        // eslint-disable-next-line
        // @ts-ignore
        !tagButton.current.contains(event.target)
      ) {
        setOpen(false)
      }
    })
  }, [])

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

          <div className="flex flex-col items-start gap-1 relative">
            <Label className="text-right">Tags</Label>

            <Button
              variant="outline"
              onClick={() => setTimeout(() => setOpen(true), 10)}
              className="w-full justify-between"
              ref={tagButton}
            >
              <span className="text-sm font-normal">
                {tagsSerch.length > 0
                  ? tagsSerch
                      .map((tag) => tags.find((t) => t.id === tag)?.name)
                      .join(', ')
                  : 'Selecione as tags'}
              </span>
              <ChevronsUpDown className="opacity-50" />
            </Button>

            <div
              className={`max-h-44 h-auto w-full top-14 absolute border-[1px] border-gray-200 bg-white transition-opacity duration-300 ease-in-out animate-fade-in ${
                !open && 'hidden opacity-0'
              }`}
              ref={tagPopover}
            >
              <div className="flex items-center p-1">
                <Input
                  id="tags-search"
                  placeholder='Ex: "Lavagem de carro"'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  className="z-50"
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
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              className="text-gray-900 bg-white hover:bg-gray-200 rounded-full flex gap-1 items-center"
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
