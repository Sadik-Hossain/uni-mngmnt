import { paginationHelper } from './../../../helpers/paginationHelper'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

// type IGenericResponse<T> = {
//   meta: {
//     page: number
//     limit: number
//     total: number
//   }
//   data: T
// }

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  option: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // const { page = 1, limit = 10 } = option
  // const skip = (page - 1) * limit

  const { searchTerm, ...filtersData } = filters

  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelper.calculatePagination(option)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        }
      }),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  //* this returns only the filtered semesters
  // const result = await AcademicSemester.find({
  //   $and: andConditions,
  // })

  //* if we give /get-semester without any query params, then it will return all the semesters, otherwise it will return the filtered semesters
  const result = await AcademicSemester.find(whereConditions)
    // .sort({ year: 'desc' })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  // return result
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  //! we will not use findbyidandupdate, because it will not trigger the pre save hook (meaning it will bypass the validation)
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true, // this will return the updated data
  })
  return result
}

const deleteSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
