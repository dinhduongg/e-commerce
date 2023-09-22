import { Response } from 'express'
import { options } from '~/models/interface/common.interface'

export const successHandler = (options: options, res: Response) => {
  return res.status(options.statusCode).json({
    status: options.statusCode,
    message: options.successMsg,
    data: {
      [options.key ?? 'data']: options.data
    }
  })
}
