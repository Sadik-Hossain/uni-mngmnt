import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function bootStrap() {
  try {
    await mongoose.connect(config.db_url as string)
    // console.log(`db connected!`)
    logger.info(`db connected!`)
    app.listen(config.port, () => {
      logger.info(`Server started on ${config.port}`)
    })
  } catch (e) {
    errorLogger.error((e as Error).message)
  }
}
bootStrap()
