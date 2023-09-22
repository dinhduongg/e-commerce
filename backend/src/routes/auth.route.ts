import { Router } from 'express'

import authController from '~/controllers/auth.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.get('/refresh', authMiddleware.verifyRefreshToken, authController.refresh)
router.post('/register', authController.createUser)
router.post('/login', authController.loginUser)
router.post('/logout', authMiddleware.requireToken, authController.logOut)
router.post('/password/forgot', authController.forgotPassword)
router.post('/password/reset', authController.resetPassword)

export default router
