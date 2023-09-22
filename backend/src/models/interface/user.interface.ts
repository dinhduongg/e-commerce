import { AuthorityRole } from '~/constants/enum'

export interface User {
  _id?: string
  // username: string
  password: string
  fullname: string
  email: string
  mobile: string
  authority: AuthorityRole
  refreshToken: string
}

export interface Credentials {
  fullname: string
  email: string
  password: string
  confirm_password: string
}
