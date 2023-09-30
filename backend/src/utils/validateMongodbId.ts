import mongoose from 'mongoose'

import { AppError } from '~/utils/error'
import { StatusCode } from '~/constants/enum'

const validateMongodbId = (id: string) => {
  const isValid = mongoose.isValidObjectId(id)
  if (!isValid) throw new AppError({ status: StatusCode.BAD_REQUEST, description: 'id không hợp lệ' })
}

export default validateMongodbId
