import { NextFunction, Request, Response } from 'express'
import { StatusCode } from '~/constants/enum'
import { joiError } from '~/models/interface/common.interface'
import { AppError } from '~/utils/error'
import { formErrorMapper } from '~/utils/formErrorMapper'
import { commonSchema } from '~/validator/product.validator'
import CommonSchema from '~/models/common.model'
import { successHandler } from '~/utils/successHandler'
import validateMongodbId from '~/utils/validateMongodbId'

const commonFieldService = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      const { error } = commonSchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = formErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const common = await CommonSchema.create(body)

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'common',
        data: common
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body
      const { id } = req.params

      validateMongodbId(id)

      const field = await CommonSchema.findById(id)

      if (!field) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Không tồn tại giá trị'
        })
      }

      field.name = body.name

      await field.save()

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'common',
        data: field
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (id === 'all') {
        const fields = await CommonSchema.find()

        const options = {
          statusCode: StatusCode.CREATED,
          successMsg: 'Thành công',
          key: 'common',
          data: fields
        }

        return successHandler(options, res)
      } else {
        const field = await CommonSchema.findById(id)

        const options = {
          statusCode: StatusCode.CREATED,
          successMsg: 'Thành công',
          key: 'common',
          data: field
        }

        return successHandler(options, res)
      }
    } catch (error) {
      next(error)
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      await CommonSchema.findByIdAndDelete(id).catch(() => {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Có lỗi khi xóa'
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
  }
}

export default commonFieldService
