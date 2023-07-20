import jwt from 'jsonwebtoken'

const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '1d' })
}

export default generateAccessToken
