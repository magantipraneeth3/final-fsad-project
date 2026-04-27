import { Router } from 'express'
import { getAdminDashboard, getUserDashboard } from '../controllers/dashboardController.js'
import { protect, requireRole } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/admin', protect, requireRole('ADMIN'), getAdminDashboard)
router.get('/user', protect, requireRole('USER', 'ADMIN'), getUserDashboard)

export default router
