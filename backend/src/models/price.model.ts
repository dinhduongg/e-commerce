import { model, Schema, Types } from 'mongoose'

import { ProductPrice } from './interface/price.interface'

const priceSchema = new Schema<ProductPrice>(
  {
    key: { type: String },
    title: { type: String },
    product_id: { type: Schema.Types.ObjectId, ref: 'ProductSchema' },
    prices: [
      {
        _id: false,
        property_name: { type: String },
        property_slug: { type: String },
        original: { type: Number },
        discounted: { type: Number },
        inventory: { type: Number }
      }
    ]
  },
  { timestamps: true, versionKey: false }
)

export default model<ProductPrice>('PriceSchema', priceSchema, 'prices')
