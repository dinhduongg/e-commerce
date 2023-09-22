import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { AuthorityRole, StatusCode } from '~/constants/enum'
import { AppError } from '~/utils/error'
import UserSchema from '~/models/user.model'
import { User } from '~/models/interface/user.interface'

const authMiddleware = {
  requireToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]

        if (token) {
          const decoded = jwt.decode(token)
          const user = await UserSchema.findById<User>((decoded as any).id)
          req.user = user!
          next()
        }
      } else {
        throw new AppError({
          httpCode: StatusCode.UNAUTHORZIED,
          description: 'Not authenticated'
        })
      }
    } catch (error) {
      next(error)
    }
  },

  verifyRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]

        try {
          if (token) {
            jwt.verify(token, process.env.JWT_REFRESH as string)
            const decoded = jwt.decode(token)
            const user = await UserSchema.findById<User>((decoded as any).id)
            req.user = user!
            next()
          }
        } catch (error) {
          throw new AppError({
            httpCode: StatusCode.FORBIDDEN,
            description: 'Bạn đã hết phiên đăng nhập. Tiến hành đăng xuất'
          })
        }
      } else {
        throw new AppError({
          httpCode: StatusCode.UNAUTHORZIED,
          description: 'Not authenticated'
        })
      }
    } catch (error) {
      next(error)
    }
  },

  verifyAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]

        try {
          if (token) {
            jwt.verify(token, process.env.JWT_ACCESS as string)
            const decoded = jwt.decode(token)
            const user = await UserSchema.findById<User>((decoded as any).id)
            req.user = user!
            next()
          }
        } catch (error) {
          throw new AppError({
            httpCode: StatusCode.FORBIDDEN,
            description: 'AccessToken hết hạn, đang tiến hành refresh'
          })
        }
      } else {
        throw new AppError({
          httpCode: StatusCode.UNAUTHORZIED,
          description: 'Not authenticated'
        })
      }
    } catch (error) {
      next(error)
    }
  },

  isAdmin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user

      if (user && user.authority !== AuthorityRole.ADMIN) {
        throw new AppError({ httpCode: StatusCode.UNAUTHORZIED, description: 'Not admin' })
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

export default authMiddleware
