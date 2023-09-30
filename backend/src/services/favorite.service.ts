import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { ObjectName, StatusCode } from '~/constants/enum'
import { FavoriteBody } from '~/models/interface/favorite.interface'
import ProductSchema from '~/models/product.model'
import { successHandler } from '~/utils/successHandler'
import UserSchema from '~/models/user.model'
import FavoriteSchema from '~/models/favorite.model'
import { options } from '~/models/interface/common.interface'
import { AppError } from '~/utils/error'

const favoriteService = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const body = req.body as FavoriteBody

      const product = await ProductSchema.findById(body.object_id)

      if (token) {
        const decoded = jwt.decode(token) as JwtPayload
        const user = await UserSchema.findById(decoded.id)
        const check = await FavoriteSchema.findOne({ user_id: user?._id, object_id: body.object_id })

        const favorite = {
          object_name: body.object_name,
          object_id: body.object_id,
          user_id: user?._id,
          favoriteable: {
            _id: product?._id,
            name: product?.name,
            slug: product?.slug,
            amount: product?.amount,
            image: product?.image
          }
        }

        const options = {
          statusCode: StatusCode.OK,
          successMsg: 'Thành công',
          key: 'favorite',
          data: favorite
        }

        if (check) {
          await FavoriteSchema.findByIdAndDelete(check._id)
          return successHandler(options, res)
        }

        await FavoriteSchema.create({
          ...body,
          user_id: user?._id,
          ref_path: body.object_name === ObjectName.product ? 'ProductSchema' : 'ArticleSchema',
          favoriteable: body.object_id
        })

        return successHandler(options, res)
      }

      const favorite = {
        object_name: body.object_name,
        object_id: product?._id,
        favoriteable: {
          _id: product?._id,
          name: product?.name,
          slug: product?.slug,
          amount: product?.amount,
          image: product?.image
        }
      }

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'favorite',
        data: favorite
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const body = req.body

      if (!body.object_name) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Lỗi'
        })
      }

      const favorites = await FavoriteSchema.find({ user_id: user._id, object_name: body.object_name }).populate(
        'favoriteable'
      )

      const convertFavorite = favorites.map((favorite: any) => ({
        object_name: favorite.object_name,
        object_id: favorite.object_id,
        favoriteable: {
          _id: favorite.favoriteable?._id,
          name: favorite.favoriteable?.name,
          slug: favorite.favoriteable?.slug,
          image: favorite.favoriteable?.image,
          amount: favorite.favoriteable?.amount
        }
      }))

      const options = {
        statusCode: StatusCode.OK,
        successMsg: 'Thành công',
        key: 'favorites',
        data: convertFavorite
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      let { favorites } = req.body

      if (!Array.isArray(favorites)) {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Lỗi khi truyền dữ liệu'
        })
      }

      favorites = favorites
        .filter((favorite) => !favorite.user_id)
        .map((favorite: FavoriteBody) => ({
          ...favorite,
          user_id: user._id,
          ref_path: favorite.object_name === ObjectName.product ? 'ProductSchema' : 'ArticleSchema',
          favoriteable: favorite.object_id
        }))

      await FavoriteSchema.insertMany(favorites).catch(() => {
        throw new AppError({
          status: StatusCode.BAD_REQUEST,
          description: 'Lỗi khi thêm yêu thích vào database'
        })
      })

      const favoriteProducts = await FavoriteSchema.find(
        {
          user_id: user._id,
          object_name: ObjectName.product
        },
        { createdAt: 0, updatedAt: 0 }
      ).populate('favoriteable', {
        _id: 1,
        name: 1,
        slug: 1,
        amount: 1,
        image: 1
      })

      // const favoriteArticles = await FavoriteSchema.find({
      //   user_id: user._id,
      //   object_name: ObjectName.article
      // }).populate('favoriteable')

      const options: options = {
        statusCode: StatusCode.OK,
        key: 'favorites',
        data: {
          products: favoriteProducts
          // articles: favoriteArticles
        }
      }

      return successHandler(options, res)
    } catch (error) {
      next(error)
    }
  }
}

export default favoriteService
