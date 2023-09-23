import { Router } from 'express'

import commonFieldController from '~/controllers/commonField.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.post('/create', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, commonFieldController.create)

export default router
