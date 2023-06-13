import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResposes } from '../interface/common'
import { IGenericErrorMesages } from '../interface/error'

export const handleZodError = (err: ZodError): IGenericErrorResposes => {
  const errors: IGenericErrorMesages[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
