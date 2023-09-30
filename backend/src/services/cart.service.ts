import { Request, Response, NextFunction } from 'express'

const cartService = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json('create cart')
    } catch (error) {
      next(error)
    }
  }
}

export default cartService
