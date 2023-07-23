/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Response } from 'express'
import { IGenericErrorMesages } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'
import { handleZodError } from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log(`GlobalErrorHandler ~`, err)
    : errorLogger.error('GlobalErrorHandler ~', err)
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMesages[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
