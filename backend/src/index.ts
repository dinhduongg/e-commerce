import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import logger from '~/utils/logger'
import { errorHandler, notFound } from '~/middlewares/errorHandler'

import authRoute from '~/routes/auth.route'
import userRoute from '~/routes/user.route'
import productRoute from '~/routes/product.route'
import categoryRoute from '~/routes/category.route'
import commonFieldRoute from '~/routes/common.route'
import priceRoute from '~/routes/price.route'
import favoriteRoute from '~/routes/favorite.route'

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 5000

// use package
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10000mb' }))

// routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/common-field', commonFieldRoute)
app.use('/api/price', priceRoute)
app.use('/api/favorite', favoriteRoute)

app.use(notFound)
app.use(errorHandler)

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      logger.info(
        `-------------------------------------- \n--- server is running in port ${PORT} --- \n--------------------------------------`
      )
    })
  })
  .catch((error) => {
    logger.error('Lỗi khi kết nối DB')
  })
