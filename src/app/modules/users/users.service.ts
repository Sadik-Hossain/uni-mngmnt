import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import User from './users.model'
import { genUserId } from './users.utils'

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await genUserId()
  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_student_pwd as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    // throw new Error('Failed to create user!')
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}
export const UserService = {
  createUserToDB,
}
