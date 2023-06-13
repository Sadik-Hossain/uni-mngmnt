import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  // console.log(`Uncaught exception detected `)
  errorLogger.error(err)
  process.exit(1)
})

let server: Server
async function bootStrap() {
  try {
    await mongoose.connect(config.db_url as string)
    // console.log(`db connected!`)
    logger.info(`db connected!`)
    server = app.listen(config.port, () => {
      logger.info(`Server started on ${config.port}`)
    })
  } catch (e) {
    errorLogger.error((e as Error).message)
  }

  process.on('unhandledRejection', err => {
    // console.log(`unhandled Rejection is detected, closign the server...`)
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootStrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
