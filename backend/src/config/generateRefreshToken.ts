import jwt from 'jsonwebtoken'

const generateRefesshToken = (id: string, exp?: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH as string, { expiresIn: exp ?? '365d' })
}

export default generateRefesshToken
