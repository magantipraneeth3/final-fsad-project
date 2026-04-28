import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

export const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
})

function toPostgresPlaceholders(sql) {
  let index = 0
  return sql.replace(/\?/g, () => `$${++index}`)
}

export async function query(sql, params = []) {
  const result = await pool.query(toPostgresPlaceholders(sql), params)
  const rows = result.rows
  rows.affectedRows = result.rowCount
  return rows
}

export async function testConnection() {
  await pool.query('SELECT 1')
}

export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS webinars (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      speaker VARCHAR(150) NOT NULL,
      category VARCHAR(80),
      webinar_date DATE NOT NULL,
      webinar_time TIME NOT NULL,
      duration VARCHAR(50),
      status VARCHAR(40) DEFAULT 'UPCOMING',
      image_url TEXT,
      live_url TEXT,
      recording_url TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      webinar_id INTEGER NOT NULL REFERENCES webinars(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT uq_user_webinar UNIQUE (user_id, webinar_id)
    );

    CREATE TABLE IF NOT EXISTS resources (
      id SERIAL PRIMARY KEY,
      webinar_id INTEGER NOT NULL REFERENCES webinars(id) ON DELETE CASCADE,
      title VARCHAR(180) NOT NULL,
      resource_type VARCHAR(50) DEFAULT 'FILE',
      file_url TEXT NOT NULL,
      uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `)
}
