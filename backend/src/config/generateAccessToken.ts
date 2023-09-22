import jwt from 'jsonwebtoken'

const generateAccessToken = (id: string, expried: string) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS as string, { expiresIn: expried ?? '10m' })
}

export default generateAccessToken
