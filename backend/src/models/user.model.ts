import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { User as IUser } from './interface/user.interface'

const userSchema: Schema<IUser> = new Schema(
  {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String
    },
    mobile: {
      type: String
    },
    username: {
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
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export default model<IUser>('UserSchema', userSchema, 'users')
