import { NextFunction, Request, Response } from 'express'

import authService from '~/services/auth.service'

const authController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    await authService.createUser(req, res, next)
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    await authService.loginUser(req, res, next)
  },

  logOut: async (req: Request, res: Response, next: NextFunction) => {
    await authService.logOut(req, res, next)
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    await authService.refresh(req, res, next)
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    await authService.forgotPassword(req, res, next)
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    await authService.resetPassword(req, res, next)
  }
}

export default authController
