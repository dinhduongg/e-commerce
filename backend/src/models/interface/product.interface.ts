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
  field: string
  defaultPrice?: number
  discountedPrice?: number
  inventory: number
}

export type ColorPrice = Prices
export type TypePrice = Prices
export type TastePrice = Prices
export type OriginalPrice = Prices
export type WeightPrice = Prices

export interface Discount {
  percent: number
  price: number
}

export interface ShowPrice {
  min?: number
  max?: number
  original: number
  discounted: number
}

export interface new_product {
  _id: string
  name: string
  slug: string
  discount: Discount
  show_price: ShowPrice
  comment_cont: number
  category_id: string
  tags: string[]
  description: string
  rating: number
  totalRating: number
  product_property: string[]
  color_price: ColorPrice[]
  type_price: TypePrice[]
  taset_price: TastePrice[]
  original_price: OriginalPrice[]
  weitht_price: WeightPrice[]
  image: string
  images: string[]
}
