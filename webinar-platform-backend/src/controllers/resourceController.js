import { query } from '../config/db.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const uploadResource = asyncHandler(async (req, res) => {
  const { webinar_id, title, resource_type = 'FILE', external_url = null } = req.body

  if (!webinar_id || !title) {
    const error = new Error('webinar_id and title are required')
    error.statusCode = 400
    throw error
  }

  const fileUrl = req.file ? `/uploads/${req.file.filename}` : external_url
  if (!fileUrl) {
    const error = new Error('Upload a file or provide external_url')
    error.statusCode = 400
    throw error
  }

  const result = await query(
    `INSERT INTO resources (webinar_id, title, resource_type, file_url, uploaded_by)
     VALUES (?, ?, ?, ?, ?)`,
    [webinar_id, title, resource_type, fileUrl, req.user.id],
  )

  const resources = await query('SELECT * FROM resources WHERE id = ? LIMIT 1', [result.insertId])
  res.status(201).json({ success: true, resource: resources[0] })
})

export const getResourcesByWebinar = asyncHandler(async (req, res) => {
  const resources = await query(
    'SELECT * FROM resources WHERE webinar_id = ? ORDER BY created_at DESC',
    [req.params.webinarId],
  )

  res.json({ success: true, resources })
})
