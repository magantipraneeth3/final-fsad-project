import { query } from '../config/db.js'

export async function getAdminDashboardData() {
  const [webinarCount] = await query('SELECT COUNT(*) AS total FROM webinars')
  const [registrationCount] = await query('SELECT COUNT(*) AS total FROM registrations')
  const [resourceCount] = await query('SELECT COUNT(*) AS total FROM resources')
  const recentWebinars = await query(
    `SELECT id, title, webinar_date, webinar_time, speaker, category, status
     FROM webinars
     ORDER BY webinar_date ASC, webinar_time ASC
     LIMIT 5`,
  )

  return {
    metrics: {
      activeWebinars: webinarCount.total,
      totalRegistrations: registrationCount.total,
      resourceCount: resourceCount.total,
    },
    recentWebinars,
  }
}

export async function getUserDashboardData(userId) {
  const registrations = await query(
    `SELECT r.id, w.id AS webinar_id, w.title, w.webinar_date, w.webinar_time, w.speaker, w.status
     FROM registrations r
     JOIN webinars w ON w.id = r.webinar_id
     WHERE r.user_id = ?
     ORDER BY w.webinar_date ASC, w.webinar_time ASC`,
    [userId],
  )

  const resources = await query(
    `SELECT rs.id, rs.title, rs.resource_type, rs.file_url, w.title AS webinar_title
     FROM resources rs
     JOIN webinars w ON w.id = rs.webinar_id
     ORDER BY rs.created_at DESC
     LIMIT 10`,
  )

  return {
    registrations,
    resources,
    summary: {
      registrationCount: registrations.length,
      resourceCount: resources.length,
    },
  }
}
