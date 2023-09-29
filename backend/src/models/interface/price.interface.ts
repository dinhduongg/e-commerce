import { ObjectId } from 'mongoose'
import { CommonFieldEnum } from '~/constants/enum'

export interface Price {
  // Dành cho trường hợp sản phẩm nhiều kiểu dáng nhiều giá
  propertyName: string // vd: key: color => propertyName: Trắng | Xanh | Vàng | Đỏ
  original: number
  discounted: number
  inventory: number
}

export interface ProductPrice {
  _id: string
  product_id: ObjectId
  key?: CommonFieldEnum
  title?: string // title for key color: Màu sắc
  prices: Price[]
}
