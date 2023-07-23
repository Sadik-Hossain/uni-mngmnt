import { IGenericErrorMesages } from './error'

export type IGenericErrorResposes = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMesages[]
}
export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
