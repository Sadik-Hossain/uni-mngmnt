import mongoose from 'mongoose'
import { IGenericErrorMesages } from '../interface/error'
import { IGenericErrorResposes } from '../interface/common'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResposes => {
  const errors: IGenericErrorMesages[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
