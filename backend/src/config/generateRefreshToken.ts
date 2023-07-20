import jwt from 'jsonwebtoken'

const generateRefesshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '3d' })
}

export default generateRefesshToken
