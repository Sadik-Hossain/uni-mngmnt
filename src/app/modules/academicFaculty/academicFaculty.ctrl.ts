import { Request, RequestHandler, Response } from 'express'
import { catchAsync } from '../../../shared/tryCatch'
import { sendResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'
import { AcademicFacultyService } from './academicFaculty.service'
import { IAcademicFaculty } from './academicFaculty.interface'
import { academicFacultyFilterableFields } from './academicFaculty.constant'

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty created successfully!',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // }
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculties retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicFacultyService.getSingleFaculty(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrieved successfully!',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicFacultyService.updateFaculty(id, updatedData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester updated successfully!',
    data: result,
  })
})
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicFacultyService.deleteByIdFromDB(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester deleted successfully!',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
