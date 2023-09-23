import { NextFunction, Request, Response } from 'express'
import commonFieldService from '~/services/commonField.service'

const commonFieldController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    await commonFieldService.create(req, res, next)
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    await commonFieldService.update(req, res, next)
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    await commonFieldService.get(req, res, next)
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    await commonFieldService.delete(req, res, next)
  }
}

export default commonFieldController
