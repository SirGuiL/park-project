import { useEffect, useRef, useState } from 'react'

import { Check, LoaderCircle, Plus } from 'lucide-react'

import { formatCarPlate, isValidCarPlate } from '@/lib/utils'

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
import { CarsService } from '@/services/CarsService'
import { useServices } from '@/hooks/useServices'
import { ServicesService } from '@/services/ServicesService'
import toast from 'react-hot-toast'
import { useTodaysHistory } from '@/hooks/useTodaysHistory'

type FipeType = 'cars' | 'trucks' | 'motorcycles'

type brandType = {
  cars: Brand[]
  trucks: Brand[]
  motorcycles: Brand[]
}

type carType = {
  code: string
  name: string
}

type errorType = {
  plate: string
  brand: string
  car: string
  service: string
}

type Props = {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
}

export function RegisterCarDrawer({ isOpen, setIsOpen }: Props) {
  const [carPlate, setCarPlate] = useState('')
  const [carPlateQuery, setCarPlateQuery] = useState('')
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
  const [cars, setCars] = useState<carType[]>([])
  const [isLoadingCars, setIsLoadingCars] = useState(false)
  const [carsPage, setCarsPage] = useState(1)
  const [carsMaxPages, setCarsMaxPages] = useState<number>(1)
  const [carsInput, setCarsInput] = useState('')
  const [carsQuery, setCarsQuery] = useState('')
  const [selectedCar, setSelectedCar] = useState<carType | null>(null)
  const [selectedService, setSelectedService] = useState('')
  const [servicesPage, setServicesPage] = useState(1)
  const [isLoadingServices, setIsLoadingServices] = useState(false)
  const [servicesInput, setServicesInput] = useState('')
  const [servicesQuery, setServicesQuery] = useState('')
  const [errors, setErrors] = useState<errorType>({
    brand: '',
    car: '',
    plate: '',
    service: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const brandsScroll = useRef<HTMLDivElement>(null)
  const carsScroll = useRef<HTMLDivElement>(null)
  const servicesScroll = useRef<HTMLDivElement>(null)

  const { setStoredCars } = useTodaysHistory()
  const { services, maxPages, setStoredServices, setStoredMaxPages } =
    useServices()

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

  const searchNewCarPage = async (page: number) => {
    setCarsPage(page)
    setIsLoadingCars(true)

    try {
      const response = await CarsService.getCarsFromFipeAPI({
        page: page,
        query: carsQuery,
        vehicleType: fipeType,
        brandId: selectedBrand?.code as string,
        limit: 10,
      })

      const totalPages = Math.ceil(
        response.data.metadata.count / response.data.metadata.limit
      )

      setBrandsMaxPages(totalPages)

      if (page == 1) {
        setCars(response.data.cars)
        return
      }

      setCars((prev) => [...prev, ...response.data.cars])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingCars(false)
    }
  }

  const searchNewServicePage = async (page: number) => {
    setServicesPage(page)
    setIsLoadingServices(true)

    try {
      const response = await ServicesService.fetchAll({
        page,
        query: servicesQuery,
      })

      setStoredServices([...services, ...response.data.services])
      setStoredMaxPages(Math.ceil(response.data.metadata.count / 10))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingServices(false)
    }
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { errors } = validateForm()

    if (errors > 0) {
      return
    }

    setIsLoading(true)

    try {
      await CarsService.register({
        plate: carPlate,
        brandId: selectedBrand?.id as string,
        serviceId: selectedService,
        modelCode: selectedCar?.code as string,
        modelName: selectedCar?.name as string,
      })

      await fetchCarsInService()

      toast.success('Carro registrado com sucesso', {
        position: 'top-right',
      })
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cadastrar veiculo', {
        position: 'top-right',
      })
    } finally {
      setIsOpen(false)
    }
  }

  const validateForm = () => {
    let errors = 0

    if (carPlate.trim() === '') {
      setErrors((prev) => ({ ...prev, plate: 'A placa é obrigatória' }))
      errors++
    }

    if (!isValidCarPlate(carPlate)) {
      setErrors((prev) => ({ ...prev, plate: 'Placa inválida' }))
      errors++
    }

    if (!selectedBrand) {
      setErrors((prev) => ({ ...prev, brand: 'A marca é obrigatória' }))
      errors++
    }

    if (!selectedCar) {
      setErrors((prev) => ({ ...prev, car: 'O veículo é obrigatório' }))
      errors++
    }

    if (!selectedService) {
      setErrors((prev) => ({ ...prev, service: 'O serviço é obrigatório' }))
      errors++
    }

    return { errors }
  }

  const fetchCarsInService = async () => {
    try {
      const response = await CarsService.fetchNotFinishedCars({
        page: 1,
        limit: 10,
        query: '',
      })

      setStoredCars({
        cars: response.data.carsServices,
        page: 1,
        totalItems: response.data.metadata.count,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getCarByPlate = async () => {
      try {
        const response = await CarsService.findUniqueByPlate({
          plate: carPlateQuery,
        })

        setFipeType(response.data.brand.type)

        setSelectedCar({
          code: response.data.modelCode,
          name: response.data.modelName,
        })

        setSelectedBrand(response.data.brand)
      } catch (error) {
        console.error(error)
      }
    }

    if (isValidCarPlate(carPlateQuery)) {
      getCarByPlate()
    }
  }, [carPlateQuery])

  useEffect(() => {
    const handler = setTimeout(() => {
      setCarPlateQuery(carPlate)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [carPlate])

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

  useEffect(() => {
    const fetchCarsFromBrand = async () => {
      setCarsPage(1)
      setIsLoadingCars(true)

      try {
        const response = await CarsService.getCarsFromFipeAPI({
          brandId: selectedBrand?.code as string,
          vehicleType: fipeType,
          query: carsQuery,
          limit: 10,
          page: 1,
        })

        const totalPages = Math.ceil(
          response.data.metadata.count / response.data.metadata.limit
        )

        setCarsMaxPages(totalPages)
        setCars(response.data.cars)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingCars(false)
      }
    }

    fetchCarsFromBrand()
  }, [selectedBrand, fipeType, carsQuery])

  useEffect(() => {
    const handler = setTimeout(() => {
      setCarsQuery(carsInput)
    }, 1500)

    return () => {
      clearTimeout(handler)
    }
  }, [carsInput])

  useEffect(() => {
    setServicesPage(1)
    setIsLoadingServices(true)

    const fetchServices = async () => {
      try {
        const response = await ServicesService.fetchAll({
          page: 1,
          query: servicesQuery,
        })

        setStoredServices(response.data.services)
        setStoredMaxPages(Math.ceil(response.data.metadata.count / 10))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingServices(false)
      }
    }

    fetchServices()
  }, [servicesQuery, setStoredServices, setStoredMaxPages])

  useEffect(() => {
    const handler = setTimeout(() => {
      setServicesQuery(servicesInput)
    }, 1500)

    return () => {
      clearTimeout(handler)
    }
  }, [servicesInput])

  useEffect(() => {
    if (errors.plate == 'A placa é obrigatória' && !isValidCarPlate(carPlate)) {
      return setErrors((prev) => ({ ...prev, plate: 'Placa inválida' }))
    }

    if (errors.plate !== '' && isValidCarPlate(carPlate)) {
      return setErrors((prev) => ({ ...prev, plate: '' }))
    }
  }, [carPlate, errors.plate])

  useEffect(() => {
    if (selectedBrand) {
      setErrors((prev) => ({ ...prev, brand: '' }))
    }
  }, [selectedBrand, errors.brand])

  useEffect(() => {
    if (selectedCar) {
      setErrors((prev) => ({ ...prev, car: '' }))
    }
  }, [selectedCar, errors.car])

  useEffect(() => {
    if (selectedService) {
      setErrors((prev) => ({ ...prev, service: '' }))
    }
  }, [selectedService, errors.service])

  useEffect(() => {
    setCarPlate('')
    setIsLoading(false)
    setSelectedBrand(null)
    setSelectedCar(null)
    setSelectedService('')
    setFipeType('cars')
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <form
          className="flex flex-col items-start gap-4"
          onSubmit={handleSubmitForm}
        >
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
            {errors.plate && (
              <small className="text-red-500">{errors.plate}</small>
            )}
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
                  className="max-h-[200px] overflow-y-auto"
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

            {errors.brand && (
              <small className="text-red-500">{errors.brand}</small>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="car-input">Carro</Label>

            <DropdownMenu>
              <DropdownMenuTrigger disabled={!selectedBrand} asChild>
                <div className="w-full">
                  <Input
                    id="car-input"
                    placeholder='Ex: "Focus"'
                    value={selectedCar?.name}
                    disabled={!selectedBrand}
                    readOnly
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-[375px]">
                <DropdownMenuLabel>
                  <Input
                    className="placeholder:text-gray-600 placeholder:text-sm placeholder:font-normal"
                    id="car-input"
                    value={carsInput}
                    onChange={(e) => setCarsInput(e.target.value)}
                    placeholder='Ex: "Focus"'
                  />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup
                  className="max-h-[200px] overflow-y-auto"
                  ref={carsScroll}
                >
                  <InfiniteScroll
                    hasMore={carsPage < carsMaxPages}
                    next={() => searchNewCarPage(carsPage + 1)}
                    isLoading={isLoadingCars}
                    root={carsScroll.current}
                  >
                    {cars.map((car) => (
                      <div
                        className="flex px-4 py-1 items-center justify-between cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedCar(car)}
                        key={car.code}
                      >
                        <span>{car.name}</span>

                        {selectedCar?.code === car.code && (
                          <Check size={18} strokeWidth={2} />
                        )}
                      </div>
                    ))}
                  </InfiniteScroll>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {errors.car && <small className="text-red-500">{errors.car}</small>}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="service-input">Serviço</Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full">
                  <Input
                    id="service-input"
                    placeholder='Ex: "Lavagem"'
                    value={
                      services.find((service) => service.id === selectedService)
                        ?.name || ''
                    }
                    readOnly
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-[375px]">
                <DropdownMenuLabel>
                  <Input
                    className="placeholder:text-gray-600 placeholder:text-sm placeholder:font-normal"
                    id="service-input"
                    value={servicesInput}
                    onChange={(e) => setServicesInput(e.target.value)}
                    placeholder='Ex: "Lavagem"'
                  />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup
                  className="max-h-[200px] overflow-y-auto"
                  ref={servicesScroll}
                >
                  <InfiniteScroll
                    hasMore={servicesPage < maxPages}
                    next={() => searchNewServicePage(servicesPage + 1)}
                    isLoading={isLoadingServices}
                    root={servicesScroll.current}
                  >
                    {services.map((service) => (
                      <div
                        className="flex px-4 py-1 items-center justify-between cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedService(service.id)}
                        key={service.id}
                      >
                        <span>{service.name}</span>

                        {services.find((s) => s.id === selectedService)?.id ===
                          service.id && <Check size={18} strokeWidth={2} />}
                      </div>
                    ))}
                  </InfiniteScroll>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {errors.service && (
              <small className="text-red-500">{errors.service}</small>
            )}
          </div>

          <DialogFooter className="flex justify-end self-end mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" id="cancel-btn">
                Cancelar
              </Button>
            </DialogClose>

            <Button className="w-20" type="submit">
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <Toaster />
    </Dialog>
  )
}
