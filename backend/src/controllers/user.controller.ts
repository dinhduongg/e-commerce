import { NextFunction, Request, Response } from 'express'

import userService from '~/services/user.service'

const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    await userService.createUser(req, res, next)
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    await userService.loginUser(req, res, next)
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
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
  },

  logOut: async (req: Request, res: Response, next: NextFunction) => {
    await userService.logOut(req, res, next)
  }
}

export default userController
