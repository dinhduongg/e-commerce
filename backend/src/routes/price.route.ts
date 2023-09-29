import { Router } from 'express'

import priceController from '~/controllers/price.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.post('/create', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, priceController.create)
router.get('/:product_id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, priceController.getByProductId)
router.put('/update', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, priceController.update)
router.delete('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, priceController.delete)
// router.get('/:id', commonFieldController.get)

export default router
