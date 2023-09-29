import { Request, Response, NextFunction } from 'express'

import { AppError } from '~/utils/error'
import ProductSchema from '~/models/product.model'
import { productTemplate } from '~/utils/data-template'
import { Product, new_product } from '~/models/interface/product.interface'
import { calculateDiscounted, generateSlug } from '~/utils/utilities'
import { StatusCode } from '~/constants/enum'
import validateMongodbId from '~/utils/validateMongodbId'
import findOptions from '~/utils/findOption'
import { productSchema } from '~/validator/product.validator'
import { formErrorMapper } from '~/utils/formErrorMapper'
import { joiError } from '~/models/interface/common.interface'
import { successHandler } from '~/utils/successHandler'

const productService = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as new_product

      const slug = generateSlug(body.name.replaceAll('/', ' '))
      const discounted = calculateDiscounted(
        body?.amount?.original,
        body?.discount?.percent ?? 0,
        body?.discount?.money ?? 0
      )

      const product = {
        ...body,
        discount: {
          percent: body?.discount?.percent ?? 0,
          money: body?.discount?.money ?? 0
        },
        slug: slug,
        amount: {
          ...body.amount,
          discounted: body.uniquePrice ? discounted : null
        }
      }

      const { error } = productSchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          httpCode: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const newProduct = await ProductSchema.create(product)

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'product',
        data: newProduct
      }

      return successHandler(options, res)
    } catch (error) {
      console.log(error)
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

      const product = await ProductSchema.findById(id).populate('prices')

      if (!product) {
        throw new AppError({
          httpCode: StatusCode.BAD_REQUEST,
          description: 'Không tồn tại giá trị'
        })
      }

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'prodct',
        data: product
      }

      return successHandler(options, res)
    } catch (error) {
      console.log(error)
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
