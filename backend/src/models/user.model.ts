import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { User as IUser } from './interface/user.interface'

const userSchema: Schema<IUser> = new Schema(
  {
    fullname: {
      type: String
    },
    mobile: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    authority: {
      type: String,
      required: true
    },
    // address: [{ type: Schema.Types.ObjectId, ref: 'AddressSchema' }]
    refreshToken: {
      type: String
    }
  },
  { timestamps: true, versionKey: false, collection: 'users' }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export default model<IUser>('UserSchema', userSchema)
