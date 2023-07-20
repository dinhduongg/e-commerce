import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'

import logger from '~/utils/logger'
import userRoute from '~/routes/user.route'
import { errorHandler, notFound } from '~/middlewares/errorHandler'

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 5000

// use package
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10000mb' }))

// routes
app.use('/api/user', userRoute)

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
