import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/tryCatch'
import { UserService } from './users.service'
import { RequestHandler } from 'express'
import { sendResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id, password, email, role } = req.body
    const result = await UserService.createUserToDB({
      id,
      password,
      email,
      role,
    })

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  }
)

export const UserController = {
  createUser,
}
