import { User } from '~/models/interface/user.interface'
import { AuthorityRole } from '~/constants/enum'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    _id: string
    authority: AuthorityRole
  }
}
