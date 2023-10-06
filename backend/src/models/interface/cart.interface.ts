import { ObjectId } from 'mongoose'
import { Price } from './price.interface'

export interface CartBody {
  user_id: ObjectId
  product_id: ObjectId
  price_id: ObjectId
  quantity: number
  price_slug: string
}

export interface Cart {
  _id?: string
  user_id?: string
  product_id: string
  name: string
  slug: string
  image: string
  quantity: number
  price: Price
}
