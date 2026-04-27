import { Router } from 'express'
import { getResourcesByWebinar, uploadResource } from '../controllers/resourceController.js'
import { protect, requireRole } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = Router()

router.get('/webinar/:webinarId', getResourcesByWebinar)
router.post('/', protect, requireRole('ADMIN'), upload.single('file'), uploadResource)

export default router
