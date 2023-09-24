import Joi from 'joi'
import { CommonFieldEnum } from '~/constants/enum'

import { CommonField } from '~/models/interface/common.interface'
import { new_product } from '~/models/interface/product.interface'

export const commonSchema = Joi.object<CommonField>({
  key: Joi.valid(
    CommonFieldEnum.color,
    CommonFieldEnum.original,
    CommonFieldEnum.taste,
    CommonFieldEnum.type,
    CommonFieldEnum.weight
  )
    .required()
    .messages({
      'any.required': 'Bắt buộc điền',
      'any.only': `key phải là ${CommonFieldEnum.color}, ${CommonFieldEnum.original}, ${CommonFieldEnum.taste}, ${CommonFieldEnum.type}, ${CommonFieldEnum.weight}`
    }),
  name: Joi.string().required().messages({ 'any.required': 'Bắt buộc điền' }),
  shortName: Joi.string().when('key', {
    is: Joi.equal(CommonFieldEnum.weight),
    then: Joi.string().required().messages({ 'any.required': 'Bắt buộc' }),
    otherwise: Joi.string().optional()
  }),
  value: Joi.number().when('key', {
    is: Joi.equal(CommonFieldEnum.weight),
    then: Joi.number().required().messages({ 'any.required': 'Bắt buộc' }),
    otherwise: Joi.number().optional()
  })
})

export const productSchema = Joi.object<new_product>({
  name: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  category_id: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  description: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  product_property: Joi.array().items(Joi.string()),
  image: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  images: Joi.array().items(Joi.string()).required().messages({ 'any.required': 'Không được để trống' }),
  color_price: Joi.when('show_price', {
    is: Joi.object({
      min: Joi.number().allow(null).default(null),
      max: Joi.number().allow(null).default(null),
      original: Joi.number(),
      discounted: Joi.number(),
      inventory: Joi.number()
    }).with('inventory', 'original'),
    then: Joi.array().optional(),
    otherwise: Joi.array().required()
  }),
  type_price: Joi.ref('color_price'),
  taste_price: Joi.ref('color_price'),
  original_price: Joi.ref('color_price'),
  weitht_price: Joi.ref('color_price'),
  show_price: Joi.object().when('color_price', {
    is: Joi.array()
      .items(
        Joi.object({
          inventory: Joi.number().required()
        })
      )
      .has(Joi.object({ inventory: Joi.number().required() })),
    then: Joi.object({
      original: Joi.number().required().messages({ 'any.required': 'Băt buộc nhập' }),
      discounted: Joi.number().required().messages({ 'any.required': 'Băt buộc nhập' }),
      inventory: Joi.number().required().messages({ 'any.required': 'Băt buộc nhập' })
    }),
    otherwise: Joi.optional()
  })
})
