import { Schema, model } from 'mongoose'
import { new_product } from './interface/product.interface'

const productSchema: Schema<new_product> = new Schema(
  {
    name: { type: String },
    slug: { type: String },
    uniquePrice: { type: Boolean },
    discount: {
      percent: { type: Number, default: 0 },
      money: { type: Number, default: 0 }
    },
    amount: {
      min: { type: Number },
      max: { type: Number },
      original: { type: Number },
      discounted: { type: Number },
      inventory: { type: Number }
    },
    comment_count: { type: Number },
    tags: [{ type: String }],
    description: { type: String },
    rating: { type: Number },
    rating_count: { type: Number },
    product_property: [{ type: String }],
    image: { type: String },
    images: [{ type: String }],
    category_id: { type: Schema.Types.ObjectId, ref: 'CategorySchema' },
    prices: [{ type: Schema.Types.ObjectId, ref: 'PriceSchema' }]
  },
  { timestamps: true, versionKey: false }
)

export default model<new_product>('ProducSchema', productSchema, 'products')
