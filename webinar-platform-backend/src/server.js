import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRouter from './routes/index.js'
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js'
import { initDatabase, testConnection } from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const allowedOrigins = [
  'http://localhost:5173',
  'https://final-fsad-project1-red.vercel.app',
  'https://final-fsad-project1-ekh9zwzm7-magantipraneeth3-2076s-projects.vercel.app',
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (_req, res) => {
  res.json({
    message: 'Praneeth Webinars API is running',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api', apiRouter)
app.use(notFoundHandler)
app.use(errorHandler)

try {
  await testConnection()
  await initDatabase()
  console.log('PostgreSQL connected and schema is ready')

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('Database startup failed:', err)
  process.exit(1)
}
