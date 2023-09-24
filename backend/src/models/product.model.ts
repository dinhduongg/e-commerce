import { Schema, model } from 'mongoose'
import { new_product } from './interface/product.interface'

const productSchema: Schema<new_product> = new Schema(
  {
    name: { type: String },
    slug: { type: String },
    comment_count: { type: Number },
    discount: {
      money: { type: Number },
      percent: { type: Number }
    },
    show_price: {
      min: { type: Number || null },
      max: { type: Number || null },
      original: { type: Number || null },
      discounted: { type: Number || null },
      inventory: { type: Number || null }
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'CategorySchema'
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'CategorySchema' }],
    description: { type: String },
    rating: { type: Number },
    rating_count: { type: Number },
    product_property: [{ type: String }],
    color_price: [
      {
        field: { type: Schema.Types.ObjectId, ref: 'CommonField' },
        defaultPrice: { type: Number || null },
        discountedPrice: { type: Number || null },
        inventory: { type: Number || null }
      }
    ],
    type_price: [
      {
        field: { type: Schema.Types.ObjectId, ref: 'CommonField' },
        defaultPrice: { type: Number || null },
        discountedPrice: { type: Number || null },
        inventory: { type: Number || null }
      }
    ],
    original_price: [
      {
        field: { type: Schema.Types.ObjectId, ref: 'CommonField' },
        defaultPrice: { type: Number || null },
        discountedPrice: { type: Number || null },
        inventory: { type: Number || null }
      }
    ],
    taste_price: [
      {
        field: { type: Schema.Types.ObjectId, ref: 'CommonField' },
        defaultPrice: { type: Number || null },
        discountedPrice: { type: Number || null },
        inventory: { type: Number || null }
      }
    ],
    weitht_price: [
      {
        field: { type: Schema.Types.ObjectId, ref: 'CommonField' },
        defaultPrice: { type: Number || null },
        discountedPrice: { type: Number || null },
        inventory: { type: Number || null }
      }
    ],
    image: { type: String },
    images: [{ type: String }]
  },
  { timestamps: true }
)

export default model<new_product>('ProducSchema', productSchema, 'products')
