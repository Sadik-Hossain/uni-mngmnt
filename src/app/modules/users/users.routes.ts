import { Router } from 'express'
import { createUser } from './users.ctrl'

const UserRouter = Router()

UserRouter.route('/create-user').post(createUser)

export default UserRouter
