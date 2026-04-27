import { Router } from 'express'
import {
  createWebinar,
  deleteWebinar,
  getAllWebinars,
  getWebinarById,
  updateWebinar,
} from '../controllers/webinarController.js'
import { protect, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getAllWebinars)
router.get('/:id', getWebinarById)
router.post('/', protect, requireRole('ADMIN'), createWebinar)
router.put('/:id', protect, requireRole('ADMIN'), updateWebinar)
router.delete('/:id', protect, requireRole('ADMIN'), deleteWebinar)

export default router
