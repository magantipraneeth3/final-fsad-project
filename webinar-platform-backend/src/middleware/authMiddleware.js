import jwt from 'jsonwebtoken'
import { query } from '../config/db.js'

export async function protect(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (!token) {
      const error = new Error('Authorization token is required')
      error.statusCode = 401
      throw error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const users = await query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1',
      [decoded.userId],
    )

    if (!users.length) {
      const error = new Error('User not found')
      error.statusCode = 401
      throw error
    }

    req.user = users[0]
    next()
  } catch (error) {
    error.statusCode = error.statusCode || 401
    next(error)
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = new Error('You do not have permission to access this resource')
      error.statusCode = 403
      return next(error)
    }

    next()
  }
}
