import { Router } from 'express'
import { UserRoutes } from '../modules/users/users.routes'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemeser.route'

const router = Router()
const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

// router.use('/users', UserRoutes)
// router.use('/academic-semesters', AcademicSemesterRoutes)

export default router
