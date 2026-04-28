export const initialWebinars = [
  {
    id: 'w1',
    title: 'AI for Productive Learning',
    date: '2026-05-04',
    time: '18:30',
    speaker: 'Dr. Aisha Patel',
    description:
      'Discover practical AI workflows for note-taking, research, revision, and collaborative learning.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    category: 'AI',
    attendees: 184,
    status: 'UPCOMING',
    duration: '90 mins',
    liveUrl: 'https://example.com/live/ai-learning',
    recordingUrl: 'https://example.com/recordings/ai-learning',
    resources: [
      { name: 'AI Learning Guide.pdf', type: 'pdf' },
      { name: 'Prompt Workbook.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'w2',
    title: 'Full-Stack React Workshop',
    date: '2026-05-09',
    time: '11:00',
    speaker: 'Rahul Menon',
    description:
      'Build a polished React application with routing, API integration, reusable UI, and deployment strategies.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    category: 'Development',
    attendees: 240,
    status: 'OPEN',
    duration: '2 hours',
    liveUrl: 'https://example.com/live/react-workshop',
    recordingUrl: 'https://example.com/recordings/react-workshop',
    resources: [
      { name: 'Starter Kit.zip', type: 'zip' },
      { name: 'React Cheatsheet.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'w3',
    title: 'Leadership Communication Masterclass',
    date: '2026-05-15',
    time: '16:00',
    speaker: 'Sonia Brooks',
    description:
      'Level up your executive communication, storytelling, and workshop facilitation skills.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    category: 'Leadership',
    attendees: 98,
    status: 'TRENDING',
    duration: '75 mins',
    liveUrl: 'https://example.com/live/leadership',
    recordingUrl: 'https://example.com/recordings/leadership',
    resources: [
      { name: 'Speaking Framework.pdf', type: 'pdf' },
      { name: 'Session Slides.pdf', type: 'pdf' },
    ],
  },
]

export const initialRegistrations = [
  {
    id: 'r1',
    webinarId: 'w1',
    userName: 'Maya Singh',
    email: 'maya@example.com',
    title: 'AI for Productive Learning',
    webinarTitle: 'AI for Productive Learning',
    speaker: 'Dr. Aisha Patel',
    date: '2026-05-04',
    time: '18:30',
    status: 'UPCOMING',
  },
  {
    id: 'r2',
    webinarId: 'w2',
    userName: 'Arjun Rao',
    email: 'arjun@example.com',
    title: 'Full-Stack React Workshop',
    webinarTitle: 'Full-Stack React Workshop',
    speaker: 'Rahul Menon',
    date: '2026-05-09',
    time: '11:00',
    status: 'OPEN',
  },
  {
    id: 'r3',
    webinarId: 'w1',
    userName: 'Noah Smith',
    email: 'noah@example.com',
    title: 'AI for Productive Learning',
    webinarTitle: 'AI for Productive Learning',
    speaker: 'Dr. Aisha Patel',
    date: '2026-05-04',
    time: '18:30',
    status: 'UPCOMING',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Priya Nair',
    role: 'UX Designer',
    quote: 'The webinar experience feels premium end to end. Registering, joining live, and revisiting recordings is effortless.',
  },
  {
    id: 2,
    name: 'Daniel Kim',
    role: 'Engineering Student',
    quote: 'The countdowns, reminders, and resources keep me engaged before and after every workshop.',
  },
  {
    id: 3,
    name: 'Leila Carter',
    role: 'L&D Manager',
    quote: 'The admin dashboard makes scheduling and sharing materials refreshingly simple.',
  },
]

export const adminMetrics = [
  { label: 'Active Webinars', value: '12' },
  { label: 'Total Registrations', value: '1.4K' },
  { label: 'Resource Downloads', value: '4.8K' },
]
