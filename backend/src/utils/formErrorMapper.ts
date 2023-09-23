import { formError, joiError } from '~/models/interface/common.interface'

export const formErrorMapper = (error: joiError): formError[] => {
  const formError: formError[] = []

  error.details.forEach((error) => {
    formError.push({ [error.path[0]]: error.message })
  })

  return formError
}
