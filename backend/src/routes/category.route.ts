import { Router } from 'express'

import categoryController from '~/controllers/category.controller'
import authMiddleware from '~/middlewares/auth.middleware'

const router: Router = Router()

router.get('/:id', categoryController.getCategory)
router.get('/all', categoryController.getCategory)
router.post('/create', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, categoryController.createCategory)
router.put('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, categoryController.updateCategory)
router.delete('/:id', authMiddleware.verifyAccessToken, authMiddleware.isAdmin, categoryController.deleteCategory)

export default router
