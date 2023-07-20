import { AuthorityRole } from '~/constants/enum'

export interface User {
  _id?: string
  username: string
  password: string
  firstname: string
  lastname: string
  email: string
  mobile: string
  authority: AuthorityRole
  refreshToken: string
}

export interface Credentials {
  username: string
  password: string
}
