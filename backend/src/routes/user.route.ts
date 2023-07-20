import { Router } from 'express'

import userController from '~/controllers/user.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logOut)

router.get('/all-users', userController.getAllUsers)
router.get('/refresh-access', userController.refreshAccessToken)
router.get('/:username', userController.getUser)
router.patch('/update', authMiddleware.verifyToken, userController.updateUser)
router.delete('/:username', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.deleteUser)

export default router
