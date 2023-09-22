import { OrderBy } from '~/constants/enum'

export interface Pageable {
  page: number
  maxPage?: number
}

export interface Query {
  orderBy: OrderBy
}
