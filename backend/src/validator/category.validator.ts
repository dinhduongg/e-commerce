import Joi from 'joi'

import { formError, joiError } from '~/models/interface/common.interface'
import { Category } from '~/models/interface/category.interface'

export const categorySchema = Joi.object<Category>({
  name: Joi.string().required().messages({ 'any.required': 'Bạn chưa nhập tên danh mục' }),
  sorted: Joi.number().required().messages({ 'any.required': 'Bắt buộc' }),
  featured: Joi.boolean().required().messages({ 'any.required': 'Bắt buộc' }),
  isParent: Joi.boolean().required().messages({ 'any.required': 'Bắt buộc' }),
  parent: Joi.string().when('isParent', {
    is: true,
    then: Joi.string().optional(),
    otherwise: Joi.string().required().messages({ 'any.required': 'Bắt buộc' })
  }),
  commom_field: Joi.string().required().messages({ 'any.required': 'Băt buộc' }),
  image: Joi.string().when('featured', {
    is: true,
    then: Joi.string().required().messages({ 'any.required': 'Bạn chưa tải ảnh lên' }),
    otherwise: Joi.string().optional()
  })
})

export const CategoryformErrorMapper = (error: joiError): formError[] => {
  const formError: formError[] = []

  error.details.forEach((error) => {
    formError.push({ [error.path[0]]: error.message })
  })

  return formError
}
