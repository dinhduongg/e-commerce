import { NextFunction, Request, Response } from 'express'
import { StatusCode } from '~/constants/enum'
import { AppError } from '~/utils/error'

// not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError({
    status: StatusCode.INTERNAL_SERVER,
    description: `Not found: ${req.method}: ${req.originalUrl}`
  })
  next(error)
}

// error handler
const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status ? error.status : 500

  const { isOperational, name, ...other } = error

  return res.status(statusCode).json({
    error: {
      ...other
    }
  })
}

export { notFound, errorHandler }
