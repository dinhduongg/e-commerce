import Joi from 'joi'
import { ObjectName } from '~/constants/enum'

import { FavoriteBody } from '~/models/interface/favorite.interface'

export const favoriteschema = Joi.object<FavoriteBody>({
  object_name: Joi.string()
    .allow(ObjectName.article, ObjectName.product)
    .required()
    .messages({ 'any.required': 'Không được để trống' }),
  object_id: Joi.string().required().messages({ 'any.required': 'Không được để trống' })
})
