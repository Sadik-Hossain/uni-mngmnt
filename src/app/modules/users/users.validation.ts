import { z } from 'zod'
const createUserZodSchema = z.object({
  //req-validation
  //body --> object
  //data --> object

  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
})
export const UserValidation = {
  createUserZodSchema,
}
