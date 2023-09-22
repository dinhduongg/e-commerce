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
