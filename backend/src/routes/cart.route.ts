import { Router } from 'express'

import cartController from '~/controllers/cart.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.post('/add', cartController.create) // use for add and delete cart
// router.get('/favorites', authMiddleware.verifyAccessToken, cartController.get)

export default router
