import { useEffect, useState } from 'react'
import { CalendarDays, PlayCircle, UserCircle2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import RegistrationStatus from '../components/RegistrationStatus'
import { webinarApi } from '../services/api'
import { useApp } from '../services/AppContext'

export default function WebinarDetailsPage() {
  const { id } = useParams()
  const { webinars, registrations, registerForWebinar, unregisterFromWebinar } = useApp()
  const fallbackWebinar = webinars.find((item) => String(item.id) === String(id))
  const [webinar, setWebinar] = useState(fallbackWebinar || null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationId, setRegistrationId] = useState(null)

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const details = await webinarApi.details(id)
        setWebinar(details)
      } catch {
        setWebinar(fallbackWebinar || null)
      }
    }

    loadDetails()
  }, [fallbackWebinar, id])

  useEffect(() => {
    const registration = registrations.find((item) => String(item.webinarId) === String(id))
    setIsRegistered(!!registration)
    setRegistrationId(registration?.id || null)
  }, [registrations, id])

  const handleRegistrationToggle = async () => {
    if (isRegistered && registrationId) {
      await unregisterFromWebinar(registrationId)
    } else {
      await registerForWebinar(id)
    }
  }

  if (!webinar) {
    return (
      <div className="page-shell py-20">
        <GlassCard className="p-10 text-center text-slate-300">Webinar not found.</GlassCard>
      </div>
    )
  }

  return (
    <div className="page-shell py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="overflow-hidden">
          <img src={webinar.image} alt={webinar.title} className="h-80 w-full object-cover" />
          <div className="p-8">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200 light:text-cyan-700">
                {webinar.category}
              </span>
              <RegistrationStatus isRegistered={isRegistered} status={webinar.status} />
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold text-white light:text-slate-900">{webinar.title}</h1>
            <p className="mt-4 text-base leading-8 text-slate-300 light:text-slate-700">{webinar.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-4 light:bg-white/80">
                <CalendarDays className="text-cyan-300 light:text-cyan-700" size={18} />
                <p className="mt-3 text-sm text-slate-400 light:text-slate-600">Date & Time</p>
                <p className="mt-1 font-semibold text-white light:text-slate-900">{webinar.date} | {webinar.time}</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 light:bg-white/80">
                <UserCircle2 className="text-cyan-300 light:text-cyan-700" size={18} />
                <p className="mt-3 text-sm text-slate-400 light:text-slate-600">Speaker</p>
                <p className="mt-1 font-semibold text-white light:text-slate-900">{webinar.speaker}</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 light:bg-white/80">
                <PlayCircle className="text-cyan-300 light:text-cyan-700" size={18} />
                <p className="mt-3 text-sm text-slate-400 light:text-slate-600">Access</p>
                <p className="mt-1 font-semibold text-white light:text-slate-900">{webinar.status}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                onClick={handleRegistrationToggle}
                variant={isRegistered ? 'danger' : 'primary'}
              >
                {isRegistered ? 'Cancel Registration' : 'Register'}
              </Button>
              <Button variant="secondary">Join Live</Button>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300 light:text-cyan-700">Session Player</p>
            <div className="mt-4 aspect-video rounded-[2rem] border border-dashed border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <PlayCircle size={54} className="mx-auto text-cyan-300 light:text-cyan-700" />
                  <p className="mt-3 text-sm text-slate-300 light:text-slate-700">Embedded player UI for live or recorded webinar</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300 light:text-cyan-700">Downloadable Materials</p>
            <div className="mt-4 space-y-3">
              {webinar.resources && webinar.resources.length > 0 ? (
                webinar.resources.map((resource) => (
                  <div
                    key={resource.name}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 light:border-slate-200 light:bg-white/80 light:text-slate-800"
                  >
                    {resource.name}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 light:text-slate-600">No materials available yet.</p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
