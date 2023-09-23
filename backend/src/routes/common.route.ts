import { Router } from 'express'

import commonFieldController from '~/controllers/commonField.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.post('/create', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, commonFieldController.create)
router.put('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, commonFieldController.update)
router.delete('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, commonFieldController.delete)
router.get('/:id', commonFieldController.get)

export default router
