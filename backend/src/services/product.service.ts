import { NextFunction, Request, Response } from 'express'

import { StatusCode } from '~/constants/enum'
import { joiError } from '~/models/interface/common.interface'
import { new_product } from '~/models/interface/product.interface'
import PriceSchema from '~/models/price.model'
import ProductSchema from '~/models/product.model'
import { AppError } from '~/utils/error'
import findOptions from '~/utils/findOption'
import { formErrorMapper } from '~/utils/formErrorMapper'
import { successHandler } from '~/utils/successHandler'
import { calculateDiscounted, generateSlug } from '~/utils/utilities'
import validateMongodbId from '~/utils/validateMongodbId'
import { productSchema } from '~/validator/product.validator'

const productService = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as new_product

      const { error } = productSchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const slug = generateSlug(body.name.replaceAll('/', ' '))
      const discounted = calculateDiscounted(
        body?.amount?.original ?? 0,
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

      const newProduct = await ProductSchema.create(product)

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'product',
        data: newProduct
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const body = req.body

      body.slug = generateSlug(body.name.replaceAll('/', ' '))

      if (body.uniquePrice) {
        body.amount = {
          ...body.amount,
          discounted: calculateDiscounted(
            body?.amount?.original ?? 0,
            body?.discount?.percent ?? 0,
            body?.discount?.money ?? 0
          )
        }
      }

      const productUpdate = await ProductSchema.findByIdAndUpdate(id, body, { new: true })

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'product',
        data: productUpdate
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await ProductSchema.findByIdAndDelete(id)
      await PriceSchema.deleteMany({ product_id: id }).catch(() => {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Lỗi khi xóa giá sản phẩm'
        })
      })

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công'
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      if (id === 'all') {
        const products = await ProductSchema.find().populate('prices')

        const options = {
          statusCode: StatusCode.OK,
          successMsg: 'Thành công',
          key: 'prodcts',
          data: products
        }

        return successHandler(options, res)
      }

      validateMongodbId(id)

      const product = await ProductSchema.findById(id).populate('prices')

      if (!product) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
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
