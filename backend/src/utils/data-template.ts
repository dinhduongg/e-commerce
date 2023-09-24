import { AuthorityRole } from '~/constants/enum'
import { Category } from '~/models/interface/category.interface'
import { Product, new_product } from '~/models/interface/product.interface'
import { User } from '~/models/interface/user.interface'

export const userTemplate: User = {
  email: '',
  fullname: '',
  mobile: '',
  password: '',
  authority: AuthorityRole.USER,
  refreshToken: ''
}

export const productTemplate: Product = {
  name: '',
  slug: '',
  image: '',
  description: '',
  originalPrice: 0,
  currentPrice: 0,
  discountPercent: 0,
  discountMoney: 0,
  quantity: 0,
  categories: [],
  tags: [],
  rating: {
    star: 0,
    totalReview: 0
  }
}

export const categoryTemplate: Category = {
  featured: false,
  isParent: false,
  name: '',
  slug: '',
  sorted: 1,
  image: '',
  commom_field: ''
}
