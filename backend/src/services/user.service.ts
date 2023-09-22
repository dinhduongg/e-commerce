/* eslint-disable no-useless-catch */
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import generateAccessToken from '~/config/generateAccessToken'
import { AuthorityRole, StatusCode } from '~/constants/enum'
import { User } from '~/models/interface/user.interface'
import UserSchema from '~/models/user.model'
import { AppError } from '~/utils/error'
import { successHandler } from '~/utils/successHandler'

const userService = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await UserSchema.find()

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'users',
        data: users ?? []
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne({ username: username })

      successHandler(
        {
          statusCode: StatusCode.OK,
          key: 'user',
          data: user
        },
        res
      )
    } catch (error) {
      next(error)
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params
      await UserSchema.deleteOne({ username: username })

      return res.status(StatusCode.OK).json({ message: 'Xóa user thành công' })
    } catch (error) {
      next(error)
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const { _id, email, password, authority, ...other } = req.body as User

      await UserSchema.findByIdAndUpdate(user._id, { ...other }, { new: true })

      return res.status(StatusCode.OK).json({ message: 'Cập nhật user thành công' })
    } catch (error) {
      next(error)
    }
  },

  refreshAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies
      if (!refreshToken) {
        throw new AppError({ httpCode: StatusCode.BAD_REQUEST, description: 'Không có refresh token ở cookies' })
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload

      if (!decoded) {
        throw new AppError({ httpCode: StatusCode.BAD_REQUEST, description: 'Có lỗi trong quá trình refresh token' })
      }

      const accessToken = generateAccessToken(decoded.id, decoded.authority === AuthorityRole.ADMIN ? '365d' : '10m')

      return res.json({ accessToken })
    } catch (error) {
      next(error)
    }
  }
}

export default userService
