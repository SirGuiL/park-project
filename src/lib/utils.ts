import { clsx, type ClassValue } from 'clsx'
import { differenceInMinutes } from 'date-fns'
import { twMerge } from 'tailwind-merge'

interface calculateTotalPriceProps {
  created_at: Date
  price: number
  addition: number
}

type taxProps = {
  debitRate: number
  creditRate: number
  moneyRate: number
  pixRate: number
}

type hasCachedPageData = {
  // eslint-disable-next-line
  cachedItems: any[]
  page: number
  pageSize?: number
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCarPlate(input: string) {
  let cleanedInput = input.replace(/\W/g, '').toUpperCase()

  if (cleanedInput.length > 7) {
    cleanedInput = cleanedInput.substring(0, 7)
  }

  if (cleanedInput.length === 7 && /\d{4}$/.test(cleanedInput)) {
    return `${cleanedInput.substring(0, 3)}-${cleanedInput.substring(3)}`
  } else {
    return cleanedInput
  }
}

export function isValidCarPlate(plate: string) {
  const oldCarPlateRegex = /^[A-Z]{3}-\d{4}$/
  const newCarPlateRegex = /^[A-Z]{3}\d[A-Z]\d{2}$/

  return oldCarPlateRegex.test(plate) || newCarPlateRegex.test(plate)
}

export function calculateTotalPrice(props: calculateTotalPriceProps) {
  const { created_at, price, addition } = props
  const hours = differenceInMinutes(new Date(), created_at) / 60

  return {
    total: price * hours + price * hours * addition,
    addition: price * hours * addition,
  }
}

export function getAdditionByMethod(method: string, tax: taxProps) {
  if (method == 'credit') {
    return tax.creditRate
  }

  if (method == 'debit') {
    return tax.debitRate
  }

  if (method == 'pix') {
    return tax.pixRate
  }

  return tax.moneyRate
}

export function formatPriceToBRL(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export function formatCentsToBRL(cents: number) {
  const brl = cents / 100

  return brl.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function getContrastColor(hexColor: string) {
  hexColor = hexColor.replace('#', '')

  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)

  const luminance = (component: number) => {
    const normalized = component / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  }

  const relativeLuminance =
    0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b)

  return relativeLuminance > 0.5 ? '#000000' : '#FFFFFF'
}

export function isValidPassword(password: string) {
  if (password.length < 8) {
    return false
  }

  if (!/\d/.test(password)) {
    return false
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false
  }

  if (!/[A-Za-z]/.test(password)) {
    return false
  }

  if (!/[A-Z]/.test(password)) {
    return false
  }

  return true
}

export function verifyCNPJ(string: string) {
  const cleanCNPJ = string.replace(/[^\d]/g, '')

  if (cleanCNPJ.length !== 14) {
    return false
  }

  const allDigits = /^(.)\1+$/.test(cleanCNPJ)
  if (allDigits) {
    return false
  }

  const firstDigitsWeight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const secondDigitsWeight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const calculateCheckDigit = (cnpj: string, pesos: number[]) => {
    let sum = 0

    for (let i = 0; i < pesos.length; i++) {
      sum += parseInt(cnpj.charAt(i)) * pesos[i]
    }

    const remainderOfDivision = sum % 11
    return remainderOfDivision < 2 ? 0 : 11 - remainderOfDivision
  }

  const verifyFirstDigit = calculateCheckDigit(
    cleanCNPJ.substring(0, 12),
    firstDigitsWeight
  )
  const verifySecondDigit = calculateCheckDigit(
    cleanCNPJ.substring(0, 12) + verifyFirstDigit,
    secondDigitsWeight
  )

  return (
    parseInt(cleanCNPJ.charAt(12)) === verifyFirstDigit &&
    parseInt(cleanCNPJ.charAt(13)) === verifySecondDigit
  )
}

export function formatCNPJ(cnpj: string) {
  const cnpj_regex = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/

  return cnpj.replace(cnpj_regex, '$1.$2.$3/$4-$5')
}

export function hasCachedPage(data: hasCachedPageData): boolean {
  const { cachedItems, page, pageSize = 10 } = data

  const start = (page - 1) * pageSize
  const end = page * pageSize

  return cachedItems.slice(start, end).length > 0
}
