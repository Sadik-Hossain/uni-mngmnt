/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  db_url: process.env.DB_URL,
  default_student_pwd: process.env.DEFAULT_STUDENT_PWD,
}
