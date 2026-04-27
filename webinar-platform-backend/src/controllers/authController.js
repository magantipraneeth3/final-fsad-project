import bcrypt from 'bcryptjs'
import { query } from '../config/db.js'
import { generateToken } from '../utils/token.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'USER' } = req.body

  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required')
    error.statusCode = 400
    throw error
  }

  const existing = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
  if (existing.length) {
    const error = new Error('Email is already registered')
    error.statusCode = 409
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const result = await query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role.toUpperCase()],
  )

  const users = await query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1',
    [result.insertId],
  )

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    token: generateToken(result.insertId),
    user: users[0],
  })
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    const error = new Error('Email and password are required')
    error.statusCode = 400
    throw error
  }

  const users = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
  if (!users.length) {
    const error = new Error('Invalid email or password')
    error.statusCode = 401
    throw error
  }

  const user = users[0]
  const passwordMatch = await bcrypt.compare(password, user.password_hash)
  if (!passwordMatch) {
    const error = new Error('Invalid email or password')
    error.statusCode = 401
    throw error
  }

  res.json({
    success: true,
    message: 'Login successful',
    token: generateToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    },
  })
})

export const getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  })
})
