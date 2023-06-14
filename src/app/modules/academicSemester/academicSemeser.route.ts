import { Router } from 'express'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.ctrl'

const router = Router()

router
  .route('/create-semester')
  .post(
    validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
  )

export const AcademicSemesterRoutes = router
