import { asyncHandler } from '../utils/asyncHandler.js'
import { getAdminDashboardData, getUserDashboardData } from '../services/dashboardService.js'

export const getAdminDashboard = asyncHandler(async (_req, res) => {
  const data = await getAdminDashboardData()
  res.json({ success: true, ...data })
})

export const getUserDashboard = asyncHandler(async (req, res) => {
  const data = await getUserDashboardData(req.user.id)
  res.json({ success: true, ...data })
})
