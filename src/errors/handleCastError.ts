import mongoose from 'mongoose'
import { IGenericErrorMesages } from '../interface/error'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMesages[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}
export default handleCastError
