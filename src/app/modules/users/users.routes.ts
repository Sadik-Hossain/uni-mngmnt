import { Router } from 'express'
import { UserController } from './users.ctrl'
import { validateRequest } from '../../middlewares/validateRequest'
import { UserValidation } from './users.validation'

const router = Router()

router
  .route('/create-user')
  .post(
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  )

export const UserRoutes = router
