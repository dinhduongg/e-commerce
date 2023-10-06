import { Schema, model } from 'mongoose'
import { CartBody } from './interface/cart.interface'

const cartSchema = new Schema<CartBody>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
    product_id: { type: Schema.Types.ObjectId, ref: 'ProductSchema' },
    price_id: { type: Schema.Types.ObjectId, ref: 'PriceSchema' },
    quantity: { type: Number },
    price_slug: { type: String }
  },
  { timestamps: true, versionKey: false }
)

export default model<CartBody>('CartSchema', cartSchema, 'carts')
