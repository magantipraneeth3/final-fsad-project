import { Router } from 'express'
import authRoutes from './authRoutes.js'
import webinarRoutes from './webinarRoutes.js'
import registrationRoutes from './registrationRoutes.js'
import resourceRoutes from './resourceRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/webinars', webinarRoutes)
router.use('/registrations', registrationRoutes)
router.use('/resources', resourceRoutes)
router.use('/dashboard', dashboardRoutes)

export default router
