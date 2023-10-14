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

export interface NewCategory {
  _id?: string
  parent_id?: string
  image?: string
  name: string
  slug: string
  show_home: boolean
  level: number
  sorted: number
  featured: boolean
}
