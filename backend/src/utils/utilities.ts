import slugify from 'slugify'
import { ProductPrice } from '~/models/interface/price.interface'

export const generateSlug = (name: string) => {
  return slugify(name, { trim: true, lower: true })
}

export const calculateDiscounted = (originalPrice: number, discountPercent: number, discountMoney: number) => {
  return originalPrice - (originalPrice * discountPercent) / 100 - discountMoney
}

export const getMinMaxPrice = (prices: ProductPrice[]): { min: number; max: number } => {
  let arr: any = []

  for (let i = 0; i < prices.length; i++) {
    const original = prices[i].prices.map((item) => item.original)

    arr = arr.concat(original)
  }

  const min = Math.min.apply(null, arr)
  const max = Math.max.apply(null, arr)

  return { min, max }
}
