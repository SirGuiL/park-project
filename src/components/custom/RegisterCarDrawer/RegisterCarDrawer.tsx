import { useEffect, useRef, useState } from 'react'

import { Check, Plus } from 'lucide-react'

import { formatCarPlate } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/toaster'

import { Brand } from '@/DTOs/brand'
import { BrandsService } from '@/services/BrandsService'
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { InfiniteScroll } from '../utils'

type FipeType = 'cars' | 'trucks' | 'motorcycles'

type brandType = {
  cars: Brand[]
  trucks: Brand[]
  motorcycles: Brand[]
}

export function RegisterCarDrawer() {
  const [carPlate, setCarPlate] = useState('')
  const [fipeType, setFipeType] = useState<FipeType>('cars')
  const [isLoadingBrands, setIsLoadingBrands] = useState(false)
  const [brandsPage, setBrandsPage] = useState(1)
  const [brandsMaxPages, setBrandsMaxPages] = useState<number>(1)
  const [brandsInput, setBrandsInput] = useState('')
  const [brandsQuery, setBrandsQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [brands, setBrands] = useState<brandType>({
    cars: [],
    motorcycles: [],
    trucks: [],
  })

  const brandsScroll = useRef<HTMLDivElement>(null)

  const searchNewPage = async (page: number) => {
    setBrandsPage(page)
    setIsLoadingBrands(true)

    try {
      const response = await BrandsService.getAllBrands({
        page: page,
        query: brandsQuery,
        type: fipeType,
      })

      const totalPages = Math.ceil(
        response.data.metadata.count / response.data.metadata.limit
      )

      setBrandsMaxPages(totalPages)

      if (page == 1) {
        setBrands((prev) => ({
          ...prev,
          [fipeType]: response.data.brands,
        }))
        return
      }

      setBrands((prev) => ({
        ...prev,
        [fipeType]: [...prev[fipeType], ...response.data.brands],
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingBrands(false)
    }
  }

  useEffect(() => {
    const fetchBrands = async () => {
      setBrandsPage(1)
      setIsLoadingBrands(true)

      try {
        const response = await BrandsService.getAllBrands({
          page: 1,
          query: brandsQuery,
          type: fipeType,
        })

        const totalPages = Math.ceil(
          response.data.metadata.count / response.data.metadata.limit
        )

        setBrandsMaxPages(totalPages)
        setBrands((prev) => ({
          ...prev,
          [fipeType]: response.data.brands,
        }))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingBrands(false)
      }
    }

    fetchBrands()
  }, [fipeType, brandsQuery])

  useEffect(() => {
    const handler = setTimeout(() => {
      setBrandsQuery(brandsInput)
    }, 1500)

    return () => {
      clearTimeout(handler)
    }
  }, [brandsInput])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-sky-800 hover:bg-sky-900 text-gray-200 rounded-full flex gap-1 items-center">
          <Plus color="#e5e7eb" size={18} strokeWidth={2} />

          <span>Lançar carro</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white flex flex-col gap-10 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle>Lançar carro</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Placa</Label>
            <Input
              id="plate"
              placeholder="Digite a placa do carro aqui"
              onInput={(e) =>
                (e.currentTarget.value = formatCarPlate(e.currentTarget.value))
              }
              value={carPlate}
              onChange={(e) => setCarPlate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="plate">Tipo de veículo</Label>

            <RadioGroup
              className="flex gap-5"
              value={fipeType}
              onValueChange={(e: FipeType) => setFipeType(e)}
              defaultValue="cars"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cars" id="r1" />
                <Label htmlFor="r1">Carro</Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="motorcycles" id="r2" />
                <Label htmlFor="r2">Moto</Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="trucks" id="r3" />
                <Label htmlFor="r3">Caminhão</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="brand-input">Marca</Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full">
                  <Input
                    id="brand-input"
                    placeholder='Ex: "Ford"'
                    value={selectedBrand?.name}
                    readOnly
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-[375px]">
                <DropdownMenuLabel>
                  <Input
                    className="placeholder:text-gray-600 placeholder:text-sm placeholder:font-normal"
                    id="brand-input"
                    value={brandsInput}
                    onChange={(e) => setBrandsInput(e.target.value)}
                    placeholder='Ex: "Ford"'
                  />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup
                  className="max-h-[300px] overflow-y-auto"
                  ref={brandsScroll}
                >
                  <InfiniteScroll
                    hasMore={brandsPage < brandsMaxPages}
                    next={() => searchNewPage(brandsPage + 1)}
                    isLoading={isLoadingBrands}
                    root={brandsScroll.current}
                  >
                    {brands[fipeType].map((brand) => (
                      <div
                        className="flex px-4 py-1 items-center justify-between cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedBrand(brand)}
                        key={brand.id}
                      >
                        <span>{brand.name}</span>

                        {selectedBrand?.id === brand.id && (
                          <Check size={18} strokeWidth={2} />
                        )}
                      </div>
                    ))}
                  </InfiniteScroll>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="submit" id="cancel-btn">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>

      <Toaster />
    </Dialog>
  )
}
