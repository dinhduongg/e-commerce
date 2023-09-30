import { StatusCode } from '~/constants/enum'
import { formError } from '~/models/interface/common.interface'

interface AppErrorArgs {
  name?: string
  field?: string
  status: StatusCode
  description?: string
  isOperational?: boolean
  formError?: formError[]
}

export class AppError extends Error {
  public readonly name: string
  public readonly status: StatusCode
  public readonly isOperational: boolean = true
  public readonly field: string | undefined
  public readonly formError: formError[] | undefined
  public readonly description: string | undefined

  constructor(args: AppErrorArgs) {
    super()

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = args.name || 'Error'
    this.description = args.description
    this.status = args.status

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational
    }

    if (args.status === 422) {
      this.field = args.field
      this.formError = args.formError
    }

    Error.captureStackTrace(this)
  }
}
