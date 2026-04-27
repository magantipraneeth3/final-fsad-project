import { Router } from 'express'
import {
  createRegistration,
  getAllRegistrations,
  getMyRegistrations,
  deleteRegistration,
  checkRegistrationStatus,
} from '../controllers/registrationController.js'
import { protect, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', protect, requireRole('USER', 'ADMIN'), createRegistration)
router.get('/mine', protect, requireRole('USER', 'ADMIN'), getMyRegistrations)
router.get('/status/:webinarId', protect, requireRole('USER', 'ADMIN'), checkRegistrationStatus)
router.delete('/:registrationId', protect, requireRole('USER', 'ADMIN'), deleteRegistration)
router.get('/', protect, requireRole('ADMIN'), getAllRegistrations)

export default router
