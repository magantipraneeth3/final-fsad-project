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
  created_by INTEGER,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_webinars_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  webinar_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_registrations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_registrations_webinar FOREIGN KEY (webinar_id) REFERENCES webinars(id) ON DELETE CASCADE,
  CONSTRAINT uq_user_webinar UNIQUE (user_id, webinar_id)
);

CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  webinar_id INTEGER NOT NULL,
  title VARCHAR(180) NOT NULL,
  resource_type VARCHAR(50) DEFAULT 'FILE',
  file_url TEXT NOT NULL,
  uploaded_by INTEGER,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_resources_webinar FOREIGN KEY (webinar_id) REFERENCES webinars(id) ON DELETE CASCADE,
  CONSTRAINT fk_resources_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);
