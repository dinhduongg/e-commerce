import { Schema, model } from 'mongoose'
import { ObjectName } from '~/constants/enum'

const favoriteSchema = new Schema(
  {
    object_name: { type: String, enum: [ObjectName.product, ObjectName.article] },
    object_id: { type: String },
    user_id: { type: String },
    ref_path: { type: String, required: true, enum: ['ProductSchema', 'ArticleSchema'] },
    favoriteable: { type: Schema.Types.ObjectId, refPath: 'ref_path' }
  },
  { timestamps: true, versionKey: false }
)

export default model('FavoriteSchema', favoriteSchema, 'favorites')
