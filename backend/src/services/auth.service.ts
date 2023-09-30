import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

import generateAccessToken from '~/config/generateAccessToken'
import generateRefesshToken from '~/config/generateRefreshToken'
import { AuthorityRole, StatusCode } from '~/constants/enum'
import { joiError, options } from '~/models/interface/common.interface'
import { Credentials, User } from '~/models/interface/user.interface'
import UserSchema from '~/models/user.model'
import { userTemplate } from '~/utils/data-template'
import { AppError } from '~/utils/error'
import { successHandler } from '~/utils/successHandler'
import {
  emailSchema,
  forgotPasswordSchema,
  formErrorMapper,
  loginSchema,
  registerSchema
} from '~/validator/auth.validator'
import { sendEmail } from '~/utils/mailer'

const authService = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body as Credentials
      const { error } = registerSchema.validate(credentials, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const user: User = {
        ...userTemplate,
        email: credentials.email,
        password: credentials.password,
        fullname: credentials.fullname
      }

      const findUser = await UserSchema.findOne({ email: credentials.email })

      if (findUser) {
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: [
            {
              email: 'Email đã tồn tại'
            }
          ]
        })
      }

      const newUser = await UserSchema.create(user)

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'user',
        data: newUser
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body as Credentials

      const { error } = loginSchema.validate(credentials, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const foundUser = await UserSchema.findOne({ email: credentials.email })

      if (!foundUser) {
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: [{ email: 'Email không chính xác' }]
        })
      }

      const isMatch = bcrypt.compareSync(credentials.password, foundUser.password)

      if (!isMatch) {
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: [{ password: 'Mật khẩu không chính xác' }]
        })
      }

      const refreshToken = generateRefesshToken(foundUser._id)
      const accessToken = generateAccessToken(
        foundUser._id,
        foundUser.authority === AuthorityRole.ADMIN ? '365d' : '10m'
      )

      await UserSchema.findByIdAndUpdate(foundUser._id, { refreshToken: refreshToken }, { new: true })

      const options: options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'user',
        data: {
          email: foundUser.email,
          authority: foundUser.authority,
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  logOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user

      await UserSchema.findByIdAndUpdate(
        user._id,
        {
          refreshToken: ''
        },
        { new: true }
      )

      const options: options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công'
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user

      const accessToken = generateAccessToken(
        user._id as string,
        user.authority === AuthorityRole.ADMIN ? '365d' : '10m'
      )

      const options: options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        data: {
          accessToken
        }
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body
      const { error } = emailSchema.validate({ email }, { abortEarly: true })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const user = await UserSchema.findOne({ email })

      if (!user) {
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: [{ email: 'Email không tồn tại' }]
        })
      }

      // set time expried time is 30 minutes
      const date = new Date()
      const expried = new Date(date.getTime() + 30 * 60 * 1000).toLocaleString()

      const hashedEmail = await bcrypt.hash(user.email, 10)

      const template = `<h3 style="margin-bottom: 12px; font-size: 16px; font-weight: bold">Bạn đã gửi yêu cầu đổi mật khẩu trên website <a style="text-color: blue;" href="${process.env.APP_URL}">${process.env.APP_NAME}</a></h3>
      <span style="text-color: red; font-size: 16px">Lưu ý: Bạn có 30 phút kể từ khi nhận mail này để đổi mật khẩu</span>
    <a href="${process.env.APP_URL}/password/reset?email=${user.email}&token=${hashedEmail}&expried=${expried}">Đổi mật khẩu</a>
    `

      sendEmail(user.email, 'Quên mật khẩu', template)
        .then(() => console.log(hashedEmail))
        .catch((error) => {
          throw new AppError(error)
        })

      const options: options = {
        statusCode: StatusCode.OK,
        successMsg: 'Kiểm tra email để cập nhật mật khẩu'
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body
      const { email, token, expried } = req.query as any

      const { error } = forgotPasswordSchema.validate({ password, email, token, expried }, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const date = new Date().toLocaleString()

      if (date > expried) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Thời gian đổi mật khẩu đã hết.'
        })
      }

      const result = await bcrypt.compare(email, token)

      if (!result) {
        throw new AppError({
          status: StatusCode.INTERNAL_SERVER,
          description: 'Có lỗi mời thử lại'
        })
      }

      const user = await UserSchema.findOne({ email })

      user!.password = password
      await user!.save()

      const options: options = {
        statusCode: StatusCode.OK,
        successMsg: 'Cập nhật mật khẩu thành công'
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  }
}

export default authService
