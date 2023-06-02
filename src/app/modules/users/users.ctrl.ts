import { Request, Response } from 'express'
import { createUserToDB } from './users.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, password, email, role } = req.body
    if (!id || !password || !email || !role) {
      return res.status(404).json({ msg: 'please fill all fields' })
    }
    const result = await createUserToDB({
      id,
      password,
      email,
      role,
    })
    res.status(201).json({ data: result })
    return result
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'failed to create user',
    })
  }
}
