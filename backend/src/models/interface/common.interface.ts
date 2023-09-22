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
