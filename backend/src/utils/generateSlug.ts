import slugify from 'slugify'

export const generateSlug = (name: string) => {
  return slugify(name, { trim: true, lower: true })
}
