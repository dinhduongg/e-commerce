import { Model, Schema } from 'mongoose'
import { OrderBy } from '~/constants/enum'
import { Query } from '~/models/interface/interface'

const findOptions = async (schema: Model<any>, query: any): Promise<any> => {
  const order = {} as any
  const where = {} as any
  let skip
  let limit

  for (const property in query) {
    if (property === 'name') {
      where['name'] = { $regex: query[property], $options: 'i' }
    }

    if (property === 'orderBy') {
      switch (query[property]) {
        case OrderBy.date:
          order['createdAt'] = -1
          break
        case OrderBy.rating:
          order['rating.star'] = -1
          break
        case OrderBy.price:
          order['currentPrice'] = 1
          break
        case OrderBy.price_desc:
          order['currentPrice'] = -1
          break
      }
    }

    if (property === 'skip') skip = Number(query[property])
    if (property === 'limit') limit = Number(query[property])
  }

  const data = await schema
    .find(where)
    .sort(order)
    .skip((skip ?? 0) * (limit ?? 12))
    .limit(limit ?? 12)

  return data
}

export default findOptions
