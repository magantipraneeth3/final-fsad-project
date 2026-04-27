import { query } from '../config/db.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getAllWebinars = asyncHandler(async (_req, res) => {
  const webinars = await query(
    `SELECT w.*,
            COUNT(r.id) AS attendees
     FROM webinars w
     LEFT JOIN registrations r ON r.webinar_id = w.id
     GROUP BY w.id
     ORDER BY w.webinar_date ASC, w.webinar_time ASC`,
  )

  res.json({ success: true, webinars })
})

export const getWebinarById = asyncHandler(async (req, res) => {
  const webinars = await query(
    `SELECT w.*,
            COUNT(r.id) AS attendees
     FROM webinars w
     LEFT JOIN registrations r ON r.webinar_id = w.id
     WHERE w.id = ?
     GROUP BY w.id`,
    [req.params.id],
  )

  if (!webinars.length) {
    const error = new Error('Webinar not found')
    error.statusCode = 404
    throw error
  }

  const resources = await query(
    'SELECT id, title, resource_type, file_url, created_at FROM resources WHERE webinar_id = ? ORDER BY created_at DESC',
    [req.params.id],
  )

  res.json({ success: true, webinar: { ...webinars[0], resources } })
})

export const createWebinar = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    speaker,
    category,
    webinar_date,
    webinar_time,
    duration,
    status = 'UPCOMING',
    image_url = null,
    live_url = null,
    recording_url = null,
  } = req.body

  if (!title || !speaker || !webinar_date || !webinar_time) {
    const error = new Error('Title, speaker, date, and time are required')
    error.statusCode = 400
    throw error
  }

  const result = await query(
    `INSERT INTO webinars
      (title, description, speaker, category, webinar_date, webinar_time, duration, status, image_url, live_url, recording_url, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      speaker,
      category,
      webinar_date,
      webinar_time,
      duration,
      status,
      image_url,
      live_url,
      recording_url,
      req.user.id,
    ],
  )

  const webinars = await query('SELECT * FROM webinars WHERE id = ?', [result.insertId])
  res.status(201).json({ success: true, webinar: webinars[0] })
})

export const updateWebinar = asyncHandler(async (req, res) => {
  const webinarId = req.params.id
  const fields = [
    'title',
    'description',
    'speaker',
    'category',
    'webinar_date',
    'webinar_time',
    'duration',
    'status',
    'image_url',
    'live_url',
    'recording_url',
  ]

  const updates = []
  const params = []

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`)
      params.push(req.body[field])
    }
  })

  if (!updates.length) {
    const error = new Error('No fields provided for update')
    error.statusCode = 400
    throw error
  }

  params.push(webinarId)
  await query(`UPDATE webinars SET ${updates.join(', ')} WHERE id = ?`, params)

  const webinars = await query('SELECT * FROM webinars WHERE id = ?', [webinarId])
  if (!webinars.length) {
    const error = new Error('Webinar not found')
    error.statusCode = 404
    throw error
  }

  res.json({ success: true, webinar: webinars[0] })
})

export const deleteWebinar = asyncHandler(async (req, res) => {
  const result = await query('DELETE FROM webinars WHERE id = ?', [req.params.id])

  if (!result.affectedRows) {
    const error = new Error('Webinar not found')
    error.statusCode = 404
    throw error
  }

  res.json({ success: true, message: 'Webinar deleted successfully' })
})
