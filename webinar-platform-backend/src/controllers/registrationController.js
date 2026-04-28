import { query } from '../config/db.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const createRegistration = asyncHandler(async (req, res) => {
  const { webinar_id } = req.body

  if (!webinar_id) {
    const error = new Error('webinar_id is required')
    error.statusCode = 400
    throw error
  }

  const webinar = await query('SELECT id FROM webinars WHERE id = ? LIMIT 1', [webinar_id])
  if (!webinar.length) {
    const error = new Error('Webinar not found')
    error.statusCode = 404
    throw error
  }

  const existing = await query(
    'SELECT id FROM registrations WHERE user_id = ? AND webinar_id = ? LIMIT 1',
    [req.user.id, webinar_id],
  )

  if (existing.length) {
    const error = new Error('You are already registered for this webinar')
    error.statusCode = 409
    throw error
  }

  const result = await query(
    'INSERT INTO registrations (user_id, webinar_id) VALUES (?, ?) RETURNING id',
    [req.user.id, webinar_id],
  )

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    registrationId: result[0].id,
  })
})

export const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await query(
    `SELECT r.id, r.created_at, w.id AS webinar_id, w.title, w.webinar_date, w.webinar_time, w.speaker, w.status
     FROM registrations r
     JOIN webinars w ON w.id = r.webinar_id
     WHERE r.user_id = ?
     ORDER BY w.webinar_date ASC, w.webinar_time ASC`,
    [req.user.id],
  )

  res.json({ success: true, registrations })
})

export const getAllRegistrations = asyncHandler(async (_req, res) => {
  const registrations = await query(
    `SELECT r.id, r.created_at, u.id AS user_id, u.name AS user_name, u.email, w.id AS webinar_id, w.title AS webinar_title
     FROM registrations r
     JOIN users u ON u.id = r.user_id
     JOIN webinars w ON w.id = r.webinar_id
     ORDER BY r.created_at DESC`,
  )

  res.json({ success: true, registrations })
})

export const deleteRegistration = asyncHandler(async (req, res) => {
  const { registrationId } = req.params

  if (!registrationId) {
    const error = new Error('registrationId is required')
    error.statusCode = 400
    throw error
  }

  const registration = await query('SELECT user_id FROM registrations WHERE id = ? LIMIT 1', [
    registrationId,
  ])

  if (!registration.length) {
    const error = new Error('Registration not found')
    error.statusCode = 404
    throw error
  }

  if (registration[0].user_id !== req.user.id) {
    const error = new Error('Unauthorized to delete this registration')
    error.statusCode = 403
    throw error
  }

  await query('DELETE FROM registrations WHERE id = ?', [registrationId])

  res.json({
    success: true,
    message: 'Registration cancelled successfully',
  })
})

export const checkRegistrationStatus = asyncHandler(async (req, res) => {
  const { webinarId } = req.params

  if (!webinarId) {
    const error = new Error('webinarId is required')
    error.statusCode = 400
    throw error
  }

  const registration = await query(
    'SELECT id FROM registrations WHERE user_id = ? AND webinar_id = ? LIMIT 1',
    [req.user.id, webinarId],
  )

  res.json({
    success: true,
    isRegistered: registration.length > 0,
    registrationId: registration.length > 0 ? registration[0].id : null,
  })
})
