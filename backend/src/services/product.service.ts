import { Request, Response, NextFunction } from 'express'

import { AppError } from '~/utils/error'
import ProductSchema from '~/models/product.model'
import { productTemplate } from '~/utils/data-template'
import { Product, new_product } from '~/models/interface/product.interface'
import { generateSlug } from '~/utils/generateSlug'
import { StatusCode } from '~/constants/enum'
import validateMongodbId from '~/utils/validateMongodbId'
import findOptions from '~/utils/findOption'
import { productSchema } from '~/validator/product.validator'
import { formErrorMapper } from '~/utils/formErrorMapper'
import { joiError } from '~/models/interface/common.interface'

const productService = {
  currentPrice: (originalPrice: number, discountPercent: number, discountMoney: number) => {
    return originalPrice - (originalPrice * discountPercent) / 100 - discountMoney
  },

  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as new_product

      const { error } = productSchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          httpCode: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      // const currentPrice = productService.currentPrice(body.originalPrice, body.discountPercent, body.discountMoney)
      // const productSlug = generateSlug(body.name)

      // const product: Product = {
      //   ...productTemplate,
      //   ...body,
      //   currentPrice: currentPrice,
      //   slug: productSlug
      // }

      // const newProduct = await ProductSchema.create(product)

      // return res.status(StatusCode.CREATED).json(newProduct)
      return res.json(body)
    } catch (error) {
      next(error)
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const body = req.body

      if (body.name) {
        body.slug = generateSlug(body.name)
      }

      const productUpdate = await ProductSchema.findByIdAndUpdate(id, body, { new: true })

      return res.status(StatusCode.CREATED).json(productUpdate)
    } catch (error) {
      next(error)
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await ProductSchema.findByIdAndDelete(id)

      return res.status(StatusCode.OK).json({ message: 'Xóa product thành công' })
    } catch (error) {
      next(error)
    }
  },

  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      validateMongodbId(id)

      const product = await ProductSchema.findById(id)

      return res.status(StatusCode.OK).json(product)
    } catch (error) {
      next(error)
    }
  },

  getAllProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await findOptions(ProductSchema, req.query)

      return res.status(StatusCode.OK).json(products)
    } catch (error) {
      next(error)
    }
  }
}

export default productService
