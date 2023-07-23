import { Router } from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.ctrl'

const router = Router()

router
  .route('/')
  .post(
    validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
    AcademicFacultyController.createFaculty
  )

router.get('/:id', AcademicFacultyController.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculty
)
router.delete('/:id', AcademicFacultyController.deleteFaculty)

export const AcademicFacultyRoutes = router
