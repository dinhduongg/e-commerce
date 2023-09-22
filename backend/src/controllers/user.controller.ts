import { NextFunction, Request, Response } from 'express'

import userService from '~/services/user.service'

const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await userService.getAllUsers(req, res, next)
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    await userService.getUser(req, res, next)
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    await userService.deleteUser(req, res, next)
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    await userService.updateUser(req, res, next)
  },

  refreshAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    await userService.refreshAccessToken(req, res, next)
  }
}

export default userController
