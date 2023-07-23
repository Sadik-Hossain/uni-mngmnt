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
router.get('/', AcademicSemesterController.getAllSemesters)
router.get('/:id', AcademicSemesterController.getSingleSemesters)
// patch dile single/multiple update o krte pari
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)
router.delete('/:id', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRoutes = router

// ensure 1: route level : Update --> title: Autumn code: 01 (give me title and code both , or neither [if neither then update other excluding title and code] )

//ensure 2: service level: Update --> Mapping title: code
