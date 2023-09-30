export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORZIED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  FORM_ERROR = 422,
  INTERNAL_SERVER = 500,
  NO_CONTENT = 204
}

export enum AuthorityRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
  ANONYMOUS = 'ANONYMOUS'
}

export enum OrderBy {
  // popularity = 'popularity',
  rating = 'rating',
  date = 'date',
  price = 'price',
  price_desc = 'price-desc'
}

export enum CommonFieldEnum {
  color = 'color',
  type = 'type',
  taste = 'taste',
  original = 'original',
  weight = 'weight'
}

export enum ObjectName {
  product = 'product',
  article = 'article'
}
