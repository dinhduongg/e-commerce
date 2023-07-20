import { NextFunction, Request, Response } from 'express'
import { AppError } from '~/utils/error'

// not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// error handler
const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.httpCode ? error.httpCode : 500
  return res.status(statusCode).json({
    status: statusCode,
    message: error.message,
    stack: error.stack
  })
}

export { notFound, errorHandler }
