import { StatusCode } from '~/constants/enum'

interface AppErrorArgs {
  name?: string
  httpCode: StatusCode
  description: string
  isOperational?: boolean
}

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: StatusCode
  public readonly isOperational: boolean = true

  constructor(args: AppErrorArgs) {
    super(args.description)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = args.name || 'Error'
    this.httpCode = args.httpCode

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational
    }

    Error.captureStackTrace(this)
  }
}
