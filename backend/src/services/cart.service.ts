import { Request, Response, NextFunction } from 'express'
import { StatusCode } from '~/constants/enum'

import { Cart, CartBody } from '~/models/interface/cart.interface'
import ProductModel from '~/models/product.model'
import PriceModel from '~/models/price.model'
import { AppError } from '~/utils/error'

const cartService = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const body = req.body as CartBody

      const product = await ProductModel.findById(body.product_id).populate('prices')

      if (!product) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Sản phẩm không tồn tại'
        })
      }

      if (token) {
        return res.json({ token })
      }

      // const cartItem: Cart = {
      //   product_id: product._id,
      //   image: product.image,
      //   name: product.name,
      //   slug: product.slug,
      //   quantity: body.quantity
      // }

      res.json('them moi')
    } catch (error) {
      next(error)
    }
  }
}

export default cartService
