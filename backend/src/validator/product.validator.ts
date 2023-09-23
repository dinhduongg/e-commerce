import Joi from 'joi'
import { CommonFieldEnum } from '~/constants/enum'

import { CommonField } from '~/models/interface/common.interface'

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
