import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import router from './app/routes'
import httpStatus from 'http-status'

const app: Application = express()

// global middleware
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  res.send('hello from server')
  // throw new Error('hello errror')
  // next('hello eror')
  // throw new ApiError(400, 'my errror!')
  // Promise.reject(new Error('Unhandled Promise Rejection'))
})

app.use('/api/v1', router)

// global error handler
app.use(globalErrorHandler)

//catch all route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messge: 'Not Found!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found!',
      },
    ],
  })
  next()
})

export default app
