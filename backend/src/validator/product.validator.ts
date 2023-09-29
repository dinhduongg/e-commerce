import Joi from 'joi'
import { CommonFieldEnum } from '~/constants/enum'

import { CommonField } from '~/models/interface/common.interface'
import { ProductPrice } from '~/models/interface/price.interface'
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
  uniquePrice: Joi.boolean().required().messages({ 'any.required': 'Không được để trống' }),
  amount: Joi.object().when('uniquePrice', {
    is: true,
    then: Joi.object({
      original: Joi.number().label('original').required().messages({ 'any.required': 'Không được để trống' }),
      inventory: Joi.number().label('inventory').required().messages({ 'any.required': 'Không được để trống' })
    })
      .required()
      .messages({ 'any.required': 'Không được để trống' }),
    otherwise: Joi.optional()
  }),
  tags: Joi.array().items(Joi.string())
})

export const priceSchema = Joi.object<ProductPrice>({
  key: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  product_id: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  title: Joi.string().required().messages({ 'any.required': 'Không được để trống' }),
  prices: Joi.array()
    .items({
      propertyName: Joi.string().label('propertyName').required().messages({ 'any.required': 'Không được để trống' }),
      // original: Joi.number().label('original').required().messages({ 'any.required': 'Không được để trống' }),
      original: Joi.optional(),
      inventory: Joi.number().label('inventory').required().messages({ 'any.required': 'Không được để trống' })
    })
    .required()
    .messages({ 'any.required': 'Không được để trống' })
})
