import { Router } from 'express'

import productController from '~/controllers/product.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)
router.patch('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, productController.updateProduct)
router.delete('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, productController.deleteProduct)
router.post('/create', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, productController.createProduct)

export default router
