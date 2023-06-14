import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandlers'
import { UserRoutes } from './app/modules/users/users.routes'
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemeser.route'

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

app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)

// global error handler
app.use(globalErrorHandler)

export default app
