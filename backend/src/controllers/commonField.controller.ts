import { NextFunction, Request, Response } from 'express'
import commonFieldService from '~/services/commonField.service'

const commonFieldController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    await commonFieldService.create(req, res, next)
  }
}

export default commonFieldController
