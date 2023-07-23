import { Request, RequestHandler, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shared/tryCatch'
import { sendResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'

import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import pick from '../../../shared/pick'
import { academicSemesterFilterableFields } from './academicSemester.constant'

const createSemester: RequestHandler = catchAsync(async (req, res) => {
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
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // }
  const filters = pick(req.query, academicSemesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemesters = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSingleSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrieved successfully!',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicSemesterService.updateSemester(id, updatedData)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester updated successfully!',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester deleted successfully!',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemesters,
  updateSemester,
  deleteSemester,
}
