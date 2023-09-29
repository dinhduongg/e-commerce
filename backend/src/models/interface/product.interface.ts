import { ObjectId } from 'mongoose'
import { ProductPrice } from './price.interface'

export interface Product {
  _id?: string
  name: string
  slug: string
  image: string
  description: string
  originalPrice: number
  currentPrice: number
  discountPercent: number
  discountMoney: number
  quantity: number
  categories: string[]
  tags: string[]
  rating: {
    star: number
    totalReview: number
  }
}

export interface Discount {
  percent: number
  money: number
}

export interface ShowPrice {
  min?: number
  max?: number
  original: number
  discounted: number
  inventory: number
}

export interface new_product {
  _id: string
  name: string
  slug: string
  discount: Discount
  amount: ShowPrice
  comment_count: number
  category_id: ObjectId
  tags: string[]
  description: string
  rating: number
  rating_count: number
  product_property: string[]
  image: string
  images: string[]
  prices?: string[]
  uniquePrice: boolean
}
