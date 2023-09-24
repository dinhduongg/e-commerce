import { ObjectId } from 'mongoose'

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

// new product type

export interface Prices {
  field: string // _id of common field in database
  defaultPrice?: number
  discountedPrice?: number
  inventory?: number
}

export type ColorPrice = Prices
export type TypePrice = Prices
export type TastePrice = Prices
export type OriginalPrice = Prices
export type WeightPrice = Prices

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
  show_price: ShowPrice
  comment_count: number
  category_id: ObjectId
  tags: string[]
  description: string
  rating: number
  rating_count: number
  product_property: string[]
  color_price?: ColorPrice[]
  type_price?: TypePrice[]
  taste_price?: TastePrice[]
  original_price?: OriginalPrice[]
  weitht_price?: WeightPrice[]
  image: string
  images: string[]
}
