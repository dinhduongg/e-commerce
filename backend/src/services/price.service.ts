import { Request, Response, NextFunction } from 'express'
import { StatusCode } from '~/constants/enum'
import { joiError } from '~/models/interface/common.interface'
import { AppError } from '~/utils/error'
import { formErrorMapper } from '~/utils/formErrorMapper'
import { priceSchema } from '~/validator/product.validator'
import ProductSchema from '~/models/product.model'
import PriceSchema from '~/models/price.model'
import { calculateDiscounted, getMinMaxPrice } from '~/utils/utilities'
import { ProductPrice } from '~/models/interface/price.interface'
import { new_product } from '~/models/interface/product.interface'
import { successHandler } from '~/utils/successHandler'
import validateMongodbId from '~/utils/validateMongodbId'

const priceService = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as ProductPrice

      const { error } = priceSchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      // check if price key schema exist
      const checkExist = await PriceSchema.findOne({ product_id: body.product_id, key: body.key })
      if (checkExist) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: `Đã tồn tại giá cho ${checkExist.title}`
        })
      }

      const product = await ProductSchema.findById(body.product_id)

      if (!product?.uniquePrice && (product?.discount.money || product?.discount.percent)) {
        body.prices = body.prices.map((price) => ({
          ...price,
          discounted: calculateDiscounted(
            price.original ?? 0,
            product?.discount?.percent ?? 0,
            product?.discount?.money ?? 0
          )
        }))
      }

      const newPrice = (await PriceSchema.create(body).catch((error) => next(error))) as ProductPrice
      const prices = await PriceSchema.find({ product_id: product?._id })

      product?.prices?.push(newPrice._id)

      if (!product?.uniquePrice) {
        const { min, max } = getMinMaxPrice(prices)

        product!.amount.max = max
        product!.amount.min = min
      }

      await product?.save()

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thêm giá thành công'
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  getByProductId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { product_id } = req.params
      validateMongodbId(product_id)

      const prices = await PriceSchema.find({ product_id })

      return res.json({ prices })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      const product = await ProductSchema.findById(body.product_id)
      const price = await PriceSchema.findById(body._id)

      price!.prices = body.prices

      const prices = await PriceSchema.find({ product_id: body.product_id })

      // calculate prices
      if (product?.uniquePrice) {
        const { min, max } = getMinMaxPrice(prices)

        product!.amount.max = max
        product!.amount.min = min
      }

      if (product?.discount.money || product?.discount.percent) {
        price!.prices = body.prices.map((p: any) => ({
          ...p,
          discounted: calculateDiscounted(
            p.original ?? 0,
            product?.discount?.percent ?? 0,
            product?.discount?.money ?? 0
          )
        }))
      }

      await price?.save()
      await product?.save()

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Cập nhật giá thành công'
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const price = await PriceSchema.findById(id)

      await ProductSchema.findOneAndUpdate({ _id: price?.product_id }, { $pull: { prices: id } }, { new: true })

      await PriceSchema.findByIdAndDelete(id).catch(() => {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Lỗi khi xóa'
        })
      })

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Xóa thành công'
      }

      successHandler(options, res)
    } catch (error) {
      next(error)
    }
  }
}

export default priceService
