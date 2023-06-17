import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shared/tryCatch'
import { sendResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createSemester: RequestHandler = catchAsync(async (req, res, next) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully!',
    data: result,
  })
  next()
})

export const AcademicSemesterController = { createSemester }
