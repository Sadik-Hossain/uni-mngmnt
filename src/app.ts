import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import UserRouter from './app/modules/users/users.routes'

const app: Application = express()

// global middleware
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
// app.use("/",myRoute)

app.get('/', async (req: Request, res: Response) => {
  res.send('hello from server')
})
app.use('api/v1/users', UserRouter)

// catch all route error
// app.use((req, res, next) => {
//   // error defined by us
//   const err = new Error("404 not found");
//   err.status = 404;
//   next(err);
// });

// global error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500);
//   res.json({
//     error: {
//       message: err.message,
//     },
//   });
// });

export default app
