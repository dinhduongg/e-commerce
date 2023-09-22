import { Request, Response, NextFunction } from 'express'
import caregoryService from '~/services/category.service'

const categoryController = {
  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    await caregoryService.createCategory(req, res, next)
  },

  updateCategory: async (req: Request, res: Response, next: NextFunction) => {
    await caregoryService.updateCategory(req, res, next)
  },

  getCategory: async (req: Request, res: Response, next: NextFunction) => {
    await caregoryService.getCategory(req, res, next)
  },

  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    await caregoryService.deleteCategory(req, res, next)
  }
}

export default categoryController
