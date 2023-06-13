import { IGenericErrorMesages } from './error'

export type IGenericErrorResposes = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMesages[]
}
