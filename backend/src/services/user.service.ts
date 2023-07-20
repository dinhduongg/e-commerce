/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import UserSchema from '~/models/user.model'
import { User, Credentials } from '~/models/interface/user.interface'
import { userTemplate } from '~/utils/data-template'
import { StatusCode } from '~/constants/enum'
import { AppError } from '~/utils/error'
import generateAccessToken from '~/config/generateAccessToken'
import generateRefesshToken from '~/config/generateRefreshToken'

const userService = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body as Credentials

      const user: User = {
        ...userTemplate,
        username: credentials.username,
        password: credentials.password
      }

      const findUser = await UserSchema.findOne({ username: credentials.username })

      if (findUser) {
        throw new AppError({ httpCode: StatusCode.FORM_ERROR, description: 'Tên đăng nhập đã tồn tại.' })
      }

      const newUser = await UserSchema.create(user)

      return res.status(200).json(newUser)
    } catch (error) {
      next(error)
    }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body as Credentials

      const foundUser = await UserSchema.findOne({ username: credentials.username })

      if (!foundUser) {
        throw new AppError({ httpCode: StatusCode.FORM_ERROR, description: 'Tên đăng nhập không chính xác' })
      }

      const isMatch = bcrypt.compareSync(credentials.password, foundUser.password)

      if (!isMatch) {
        throw new AppError({ httpCode: StatusCode.FORM_ERROR, description: 'Mật khẩu không chính xác' })
      }

      const refreshToken = generateRefesshToken(foundUser._id)

      await UserSchema.findByIdAndUpdate(foundUser._id, { refreshToken: refreshToken }, { new: true })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000
      })

      return res.status(StatusCode.OK).json({
        username: foundUser.username,
        authority: foundUser.authority,
        accessToken: generateAccessToken(foundUser._id)
      })
    } catch (error) {
      next(error)
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserSchema.find()

      return res.status(StatusCode.OK).json(users)
    } catch (error) {
      next(error)
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params
      const user = await UserSchema.findOne({ username: username })

      return res.status(StatusCode.OK).json(user)
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
      const { _id, username, password, authority, ...other } = req.body as User

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

      const accessToken = generateAccessToken(decoded.id)

      return res.json({ accessToken })
    } catch (error) {
      next(error)
    }
  },

  logOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies

      if (!refreshToken) {
        throw new AppError({ httpCode: StatusCode.BAD_REQUEST, description: 'Không có refresh token ở cookies' })
      }

      await UserSchema.findOneAndUpdate(
        { refreshToken },
        {
          refreshToken: ''
        }
      )

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })

      return res.sendStatus(StatusCode.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}

export default userService
