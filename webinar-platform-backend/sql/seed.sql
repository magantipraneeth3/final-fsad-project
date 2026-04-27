USE praneeth_webinars_db;

INSERT INTO users (name, email, password_hash, role)
VALUES
  ('Admin User', 'admin@praneethwebinars.io', '$2b$10$KXNXJn2GgfEHQ1BeYRWB6OR82SUePGIfQH6FsSwnjTRY7EjnuhEcO', 'ADMIN'),
  ('Praneeth User', 'user@praneethwebinars.io', '$2b$10$KXNXJn2GgfEHQ1BeYRWB6OR82SUePGIfQH6FsSwnjTRY7EjnuhEcO', 'USER')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO webinars
  (title, description, speaker, category, webinar_date, webinar_time, duration, status, image_url, live_url, recording_url, created_by)
VALUES
  (
    'AI for Productive Learning',
    'Practical AI workflows for notes, research, and revision.',
    'Dr. Aisha Patel',
    'AI',
    '2026-05-04',
    '18:30:00',
    '90 mins',
    'UPCOMING',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    'https://example.com/live/ai-learning',
    'https://example.com/recordings/ai-learning',
    1
  ),
  (
    'Full-Stack React Workshop',
    'Build a polished React application with routing and API integration.',
    'Rahul Menon',
    'Development',
    '2026-05-09',
    '11:00:00',
    '120 mins',
    'OPEN',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    'https://example.com/live/react-workshop',
    'https://example.com/recordings/react-workshop',
    1
  ),
  (
    'Leadership Communication Masterclass',
    'Improve storytelling and facilitation skills for leadership roles.',
    'Sonia Brooks',
    'Leadership',
    '2026-05-15',
    '16:00:00',
    '75 mins',
    'TRENDING',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    'https://example.com/live/leadership',
    'https://example.com/recordings/leadership',
    1
  );

INSERT INTO registrations (user_id, webinar_id)
VALUES
  (2, 1),
  (2, 2)
ON DUPLICATE KEY UPDATE webinar_id = VALUES(webinar_id);

INSERT INTO resources (webinar_id, title, resource_type, file_url, uploaded_by)
VALUES
  (1, 'AI Learning Guide.pdf', 'PDF', 'https://example.com/files/ai-learning-guide.pdf', 1),
  (1, 'Prompt Workbook.pdf', 'PDF', 'https://example.com/files/prompt-workbook.pdf', 1),
  (2, 'React Cheatsheet.pdf', 'PDF', 'https://example.com/files/react-cheatsheet.pdf', 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);
