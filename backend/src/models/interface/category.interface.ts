export interface crumb {
  name: string
  slug: string
}

export interface Category {
  _id?: string
  parent?: string
  name: string
  slug: string
  featured: boolean
  isParent: boolean
  image?: string
  sorted: number
  commom_field: string
  // crumbs: crumb[]
}
