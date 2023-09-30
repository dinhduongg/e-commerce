import { Request, Response, NextFunction } from 'express'

import { StatusCode } from '~/constants/enum'
import { Category as ICategory } from '~/models/interface/category.interface'
import { joiError } from '~/models/interface/common.interface'
import { AppError } from '~/utils/error'
import { generateSlug } from '~/utils/utilities'
import { CategoryformErrorMapper, categorySchema } from '~/validator/category.validator'
import { categoryTemplate } from '~/utils/data-template'
import CategorySchema from '~/models/category.model'
import { successHandler } from '~/utils/successHandler'

const categoryService = {
  getCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      if (id === 'all') {
        const categories = await CategorySchema.find({})

        const options = {
          statusCode: StatusCode.OK,
          successMsg: 'Thành công',
          key: 'categories',
          data: categories
        }

        return successHandler(options, res)
      }

      const category = await CategorySchema.findById(id).populate('parent')

      if (!category) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Danh mục không tồn tại'
        })
      }

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'category',
        data: category
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as ICategory

      const { error } = categorySchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = CategoryformErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const slug = generateSlug(body.name)

      const category: ICategory = {
        ...categoryTemplate,
        ...body,
        slug: slug
      }

      const check = await CategorySchema.findOne({ slug })

      if (check) {
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: [{ name: 'Tên này đã tồn tại' }]
        })
      }

      const newCategory = await CategorySchema.create(category)

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'category',
        data: newCategory
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  updateCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as ICategory
      const { id } = req.params

      const check = await CategorySchema.findById(id)

      if (!check) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Danh mục không tồn tại'
        })
      }

      const { error } = categorySchema.validate(body, { abortEarly: false })

      if (error) {
        const formError = CategoryformErrorMapper(error as joiError)
        throw new AppError({
          status: StatusCode.FORM_ERROR,
          formError: formError
        })
      }

      const category = await CategorySchema.findByIdAndUpdate(
        id,
        { ...body, slug: generateSlug(body.name) },
        { new: true }
      )

      const options = {
        statusCode: StatusCode.CREATED,
        successMsg: 'Thành công',
        key: 'category',
        data: category
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      await CategorySchema.findByIdAndDelete(id).catch(() => {
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

export default categoryService
