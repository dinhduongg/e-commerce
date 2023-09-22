import Joi from 'joi'
import { formError, joiError } from '~/models/interface/common.interface'

import { Credentials } from '~/models/interface/user.interface'

const registerSchema = Joi.object<Credentials>({
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'Bạn chưa nhập email', 'string.email': 'Email không hợp lệ' }),
  fullname: Joi.string().trim().required().messages({ 'any.required': 'Bạn chưa nhập họ tên' }),
  password: Joi.string().min(3).max(10).required().messages({
    'any.required': 'Bạn chưa nhập mật khẩu',
    'string.min': 'Mật khẩu tối thiểu 3 ký tự',
    'string.max': 'Mật khẩu tối đa 30 ký tự'
  }),
  confirm_password: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .messages({ 'any.required': 'Bạn chưa nhập mật khẩu xác nhận', 'any.only': 'Mật khẩu xác nhận không khớp' })
})

const loginSchema = Joi.object<Credentials>({
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'Bạn chưa nhập email', 'string.email': 'Email không hợp lệ' }),
  password: Joi.string().required().messages({
    'any.required': 'Bạn chưa nhập mật khẩu'
  })
})

const emailSchema = Joi.object<{ email: string }>({
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'Bạn chưa nhập email', 'string.email': 'Email không hợp lệ' })
})

const forgotPasswordSchema = Joi.object<{ password: string; email: string; token: string; expried: string }>({
  email: Joi.string().required().messages({ 'any.required': 'Có lỗi mời thử lại' }),
  token: Joi.string().required().messages({ 'any.required': 'Có lỗi mời thử lại' }),
  expried: Joi.string().required().messages({ 'any.required': 'Có lỗi mời thử lại' }),
  password: Joi.string().min(3).max(10).required().messages({
    'any.required': 'Bạn chưa nhập mật khẩu',
    'string.min': 'Mật khẩu tối thiểu 3 ký tự',
    'string.max': 'Mật khẩu tối đa 30 ký tự'
  })
})

const formErrorMapper = (error: joiError): formError[] => {
  const formError: formError[] = []

  error.details.forEach((error) => {
    formError.push({ [error.path[0]]: error.message })
  })

  return formError
}

export { registerSchema, loginSchema, emailSchema, forgotPasswordSchema, formErrorMapper }
