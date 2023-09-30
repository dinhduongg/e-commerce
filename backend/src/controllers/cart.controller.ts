import { NextFunction, Request, Response } from 'express'

import cartService from '~/services/cart.service'

const cartController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    await cartService.create(req, res, next)
  }
}

export default cartController
