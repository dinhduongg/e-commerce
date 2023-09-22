import { Schema, model } from 'mongoose'
import { Product as IProduct } from './interface/product.interface'

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    originalPrice: {
      type: Number,
      required: true
    },
    currentPrice: {
      type: Number
    },
    discountPercent: {
      type: Number
    },
    discountMoney: {
      type: Number
    },
    quantity: {
      type: Number,
      required: true
    },
    categories: [
      // {
      //   type: Schema.Types.ObjectId,
      //   ref: 'CategorySchema'
      // }
      { type: String }
    ],
    tags: [
      // {
      //   type: Schema.Types.ObjectId,
      //   ref: 'TagSchema'
      // }
      { type: String }
    ],
    rating: {
      star: {
        type: Number
      },
      totalReview: {
        type: Number
      }
    }
  },
  { timestamps: true }
)

export default model<IProduct>('ProducSchema', productSchema, 'products')
