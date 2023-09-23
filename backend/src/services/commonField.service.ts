import { NextFunction, Request, Response } from 'express'

const commonFieldService = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('create')
    } catch (error) {
      next(error)
    }
  }
}

export default commonFieldService
