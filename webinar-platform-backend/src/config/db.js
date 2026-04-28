import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import pg from 'pg'

dotenv.config()

const { Pool } = pg
const postgresConnectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
const usePostgres = Boolean(postgresConnectionString)

const mysqlConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

const databaseName = process.env.DB_NAME || 'praneeth_webinars_db'
let pool

function getPool() {
  if (!pool) {
    throw new Error('Database pool is not initialized')
  }

  return pool
}

function toPostgresPlaceholders(sql) {
  let index = 0
  return sql.replace(/\?/g, () => `$${++index}`)
}

function withReturningId(sql) {
  if (!/^insert\b/i.test(sql) || /\breturning\b/i.test(sql)) {
    return sql
  }

  return `${sql.trim().replace(/;$/, '')} RETURNING id`
}

export async function query(sql, params = []) {
  if (usePostgres) {
    const normalizedSql = withReturningId(toPostgresPlaceholders(sql))
    const result = await getPool().query(normalizedSql, params)
    const rows = result.rows
    rows.affectedRows = result.rowCount

    if (rows[0]?.id !== undefined) {
      rows.insertId = rows[0].id
    }

    return rows
  }

  const [rows] = await getPool().query(sql, params)
  return rows
}

export async function testConnection() {
  if (usePostgres) {
    const connection = new Pool({
      connectionString: postgresConnectionString,
      ssl:
        postgresConnectionString &&
        !postgresConnectionString.includes('localhost') &&
        !postgresConnectionString.includes('127.0.0.1')
          ? { rejectUnauthorized: false }
          : false,
    })

    await connection.query('SELECT 1')
    await connection.end()
    return
  }

  const connection = await mysql.createConnection(mysqlConfig)
  await connection.query('SELECT 1')
  await connection.end()
}

export async function initDatabase() {
  if (usePostgres) {
    pool = new Pool({
      connectionString: postgresConnectionString,
      ssl:
        postgresConnectionString &&
        !postgresConnectionString.includes('localhost') &&
        !postgresConnectionString.includes('127.0.0.1')
          ? { rejectUnauthorized: false }
          : false,
    })

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await pool.query(`
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
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        webinar_id INTEGER NOT NULL REFERENCES webinars(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT uq_user_webinar UNIQUE (user_id, webinar_id)
      );
    `)

    await pool.query(`
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

    return
  }

  const connection = await mysql.createConnection(mysqlConfig)

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``)
  await connection.query(`USE \`${databaseName}\``)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'USER',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT chk_users_role CHECK (role IN ('ADMIN', 'USER'))
    )
  `)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS webinars (
      id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
      created_by BIGINT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_webinars_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT NOT NULL,
      webinar_id BIGINT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_registrations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_registrations_webinar FOREIGN KEY (webinar_id) REFERENCES webinars(id) ON DELETE CASCADE,
      CONSTRAINT uq_user_webinar UNIQUE (user_id, webinar_id)
    )
  `)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS resources (
      id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      webinar_id BIGINT NOT NULL,
      title VARCHAR(180) NOT NULL,
      resource_type VARCHAR(50) DEFAULT 'FILE',
      file_url TEXT NOT NULL,
      uploaded_by BIGINT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_resources_webinar FOREIGN KEY (webinar_id) REFERENCES webinars(id) ON DELETE CASCADE,
      CONSTRAINT fk_resources_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `)

  await connection.end()

  pool = mysql.createPool({
    ...mysqlConfig,
    database: databaseName,
  })
}
