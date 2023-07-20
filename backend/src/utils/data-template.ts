import { AuthorityRole } from '~/constants/enum'
import { User } from '~/models/interface/user.interface'

export const userTemplate: User = {
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  mobile: '',
  password: '',
  authority: AuthorityRole.USER,
  refreshToken: ''
}
