import { UserService } from './users.service'
import { RequestHandler } from 'express'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { id, password, email, role } = req.body
    const result = await UserService.createUserToDB({
      id,
      password,
      email,
      role,
    })
    res.status(201).json({ data: result })
    return result
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   msg: 'failed to create user',
    // })

    next(error)
  }
}

export const UserController = {
  createUser,
}
