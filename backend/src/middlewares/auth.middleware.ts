import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { AuthorityRole, StatusCode } from '~/constants/enum'
import { AppError } from '~/utils/error'
import UserSchema from '~/models/user.model'
import { User } from '~/models/interface/user.interface'

const authMiddleware = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]

        try {
          if (token) {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
            const user = await UserSchema.findById<User>((decoded as any).id)
            req.user = user!
            next()
          }
        } catch (error) {
          throw new AppError({
            httpCode: StatusCode.FORBIDDEN,
            description: 'access-token hết hạn, đang tiến hành refresh'
          })
        }
      } else {
        throw new AppError({
          httpCode: StatusCode.BAD_REQUEST,
          description: 'Bạn không có quyền (access-token) để thực hiện chức năng này'
        })
      }
    } catch (error) {
      next(error)
    }
  },

  isAdmin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      if (user.authority !== AuthorityRole.ADMIN) {
        throw new AppError({ httpCode: StatusCode.BAD_REQUEST, description: 'Bạn không có quyền để thực hiện' })
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

export default authMiddleware
