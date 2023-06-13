import { Router } from 'express'
import { UserController } from './users.ctrl'

const router = Router()

router.route('/create-user').post(UserController.createUser)

export const UserRoutes = router
