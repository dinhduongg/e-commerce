import { CommonFieldEnum } from '~/constants/enum'

export interface options {
  statusCode: number
  successMsg?: string
  key?: string
  data?: any
}

export interface formError {
  [key: string]: string
}

export interface joiError {
  details: Array<{
    message: string
    path: string[]
  }>
}

export interface CommonField {
  key: CommonFieldEnum
  name: string
  shortName?: string
  value?: string
}

// export interface Color {
//   name: string
// }

// export interface Type {
//   name: string
// }

// export interface Taste {
//   name: string
// }

// export interface Original {
//   name: string
// }

// export interface Weight {
//   sortName: string
//   name: string
//   quantity: number
// }
