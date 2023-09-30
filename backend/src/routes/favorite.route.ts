import { Router } from 'express'

import favoriteController from '~/controllers/favorite.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.post('/add', favoriteController.create) // use for add and delete favorite
router.get('/favorites', authMiddleware.verifyAccessToken, favoriteController.get)

export default router
