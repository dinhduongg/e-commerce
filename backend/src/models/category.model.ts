import { Schema, model } from 'mongoose'
import { Category as ICategory } from './interface/category.interface'

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String
    },
    slug: {
      type: String
    },
    featured: {
      type: Boolean
    },
    image: {
      type: String
    },
    sorted: {
      type: Number
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'CategorySchema'
    },
    commom_field: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
)

export default model<ICategory>('CategorySchema', categorySchema, 'categories')
