import path from 'path'
import { createLogger, format, transports } from 'winston'
// const { timestamp, combine, label, printf, prettyPrint } = format
const { timestamp, combine, label, printf } = format
import DailyRotateFile from 'winston-daily-rotate-file'

//custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  // return `${timestamp} [${label}] ${level}: ${message}`
  return `
  -----------------------------
  ${date.toDateString()} ${hour}hr:${min}m:${sec}s  [${label}] ${level}: ${message}
  -----------------------------
  `
})

export const logger = createLogger({
  level: 'info',

  // format: format.json(),

  // format: combine(label({ label: 'UM' }), timestamp(), myFormat, prettyPrint()),

  format: combine(label({ label: 'UM' }), timestamp(), myFormat),

  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'UM-%DATE%-sucess.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export const errorLogger = createLogger({
  level: 'error',

  // format: combine(label({ label: 'UM' }), timestamp(), myFormat, prettyPrint()),

  format: combine(label({ label: 'UM' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UM-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
