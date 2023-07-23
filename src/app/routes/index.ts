import { Router } from 'express'
import { UserRoutes } from '../modules/users/users.routes'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemeser.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'

const router = Router()
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

// router.use('/users', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRoutes)

export default router
