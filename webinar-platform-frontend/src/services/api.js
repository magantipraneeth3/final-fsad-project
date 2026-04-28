import axios from 'axios'
import { storage } from './storage'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? 'https://final-fsad-project3-backend.onrender.com/api'
      : 'http://localhost:8080/api'),
  timeout: 5000,
})

api.interceptors.request.use((config) => {
  const session = storage.get('edu-user', null)

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }

  return config
})

const normalizeResource = (resource) => ({
  id: String(resource.id),
  name: resource.title,
  type: resource.resource_type?.toLowerCase() || 'file',
  url: resource.file_url,
})

export const normalizeWebinar = (webinar) => ({
  id: String(webinar.id),
  title: webinar.title,
  date: webinar.webinar_date,
  time: webinar.webinar_time?.slice(0, 5) || '',
  speaker: webinar.speaker,
  description: webinar.description,
  image:
    webinar.image_url ||
    'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
  category: webinar.category || 'Workshop',
  attendees: Number(webinar.attendees || 0),
  status: webinar.status || 'UPCOMING',
  duration: webinar.duration || '60 mins',
  liveUrl: webinar.live_url,
  recordingUrl: webinar.recording_url,
  resources: Array.isArray(webinar.resources) ? webinar.resources.map(normalizeResource) : [],
})

export const authApi = {
  login: async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password })
    return data
  },
  register: async ({ name, email, password, role }) => {
    const { data } = await api.post('/auth/register', { name, email, password, role })
    return data
  },
  me: async () => {
    const { data } = await api.get('/auth/me')
    return data.user
  },
}

export const webinarApi = {
  list: async () => {
    const { data } = await api.get('/webinars')
    return data.webinars.map(normalizeWebinar)
  },
  details: async (id) => {
    const { data } = await api.get(`/webinars/${id}`)
    return normalizeWebinar(data.webinar)
  },
  create: async (payload) => {
    const body = {
      title: payload.title,
      description: payload.description,
      speaker: payload.speaker,
      category: payload.category,
      webinar_date: payload.date,
      webinar_time: payload.time,
      duration: payload.duration || '60 mins',
      status: payload.status || 'UPCOMING',
      image_url:
        payload.image ||
        'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
      live_url: payload.liveUrl || 'https://example.com/live/new-session',
      recording_url: payload.recordingUrl || 'https://example.com/recordings/new-session',
    }

    const { data } = await api.post('/webinars', body)
    return normalizeWebinar(data.webinar)
  },
  remove: async (id) => {
    await api.delete(`/webinars/${id}`)
  },
}

export const registrationApi = {
  mine: async () => {
    const { data } = await api.get('/registrations/mine')
    return data.registrations.map((registration) => ({
      id: String(registration.id),
      webinarId: String(registration.webinar_id),
      userName: registration.user_name,
      email: registration.email,
      title: registration.title,
      speaker: registration.speaker,
      date: registration.webinar_date,
      time: registration.webinar_time?.slice(0, 5) || '',
      status: registration.status,
    }))
  },
  all: async () => {
    const { data } = await api.get('/registrations')
    return data.registrations.map((registration) => ({
      id: String(registration.id),
      webinarId: String(registration.webinar_id),
      userId: String(registration.user_id),
      userName: registration.user_name,
      email: registration.email,
      webinarTitle: registration.webinar_title,
      createdAt: registration.created_at,
    }))
  },
  create: async (webinarId) => {
    const { data } = await api.post('/registrations', { webinar_id: webinarId })
    return data
  },
  delete: async (registrationId) => {
    const { data } = await api.delete(`/registrations/${registrationId}`)
    return data
  },
  checkStatus: async (webinarId) => {
    const { data } = await api.get(`/registrations/status/${webinarId}`)
    return {
      isRegistered: data.isRegistered,
      registrationId: data.registrationId,
    }
  },
}

export const resourceApi = {
  create: async (webinarId, fileName) => {
    const { data } = await api.post('/resources', {
      webinar_id: webinarId,
      title: fileName,
      resource_type: 'FILE',
      external_url: `https://example.com/resources/${encodeURIComponent(fileName)}`,
    })

    return normalizeResource(data.resource)
  },
}

export default api
