import { Router } from 'express'

import userController from '~/controllers/user.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.get('/all-users', authMiddleware.verifyAccessToken, userController.getAllUsers)
router.get('/:username', userController.getUser)
router.patch('/update', authMiddleware.verifyAccessToken, userController.updateUser)
router.delete('/:username', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, userController.deleteUser)
router.get('/refresh-access', userController.refreshAccessToken)

export default router
