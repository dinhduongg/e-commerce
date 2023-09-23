import { Schema, model } from 'mongoose'
import { CommonField as ICommonField } from './interface/common.interface'

const commonField: Schema<ICommonField> = new Schema(
  {
    key: {
      type: String
    },
    name: {
      type: String
    },
    shortName: {
      type: String
    },
    value: {
      type: String
    }
  },
  { timestamps: false, versionKey: false }
)

export default model<ICommonField>('CommonField', commonField, 'common-fields')
