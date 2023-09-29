import { Request, Response, NextFunction } from 'express'
import priceService from '~/services/price.service'

const priceController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    await priceService.create(req, res, next)
  },

  getByProductId: async (req: Request, res: Response, next: NextFunction) => {
    await priceService.getByProductId(req, res, next)
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    await priceService.update(req, res, next)
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    await priceService.delete(req, res, next)
  }
}

export default priceController
