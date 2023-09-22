import { Request, Response, NextFunction } from 'express'
import productService from '~/services/product.service'

const productController = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    await productService.createProduct(req, res, next)
  },

  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    await productService.getProduct(req, res, next)
  },

  getAllProduct: async (req: Request, res: Response, next: NextFunction) => {
    await productService.getAllProduct(req, res, next)
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    await productService.updateProduct(req, res, next)
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    await productService.deleteProduct(req, res, next)
  }
}

export default productController
