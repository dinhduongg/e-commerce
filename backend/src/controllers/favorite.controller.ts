import { Request, Response, NextFunction } from 'express'

import favoriteService from '~/services/favorite.service'

const favoriteController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    await favoriteService.create(req, res, next)
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    await favoriteService.get(req, res, next)
  }
}

export default favoriteController
