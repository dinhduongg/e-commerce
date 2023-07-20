import { User } from '~/models/interface/user.interface'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string
  }
}
