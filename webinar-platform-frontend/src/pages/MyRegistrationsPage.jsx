import { useState, useEffect } from 'react'
import GlassCard from '../components/GlassCard'
import RegistrationCard from '../components/RegistrationCard'
import Topbar from '../components/Topbar'
import { useApp } from '../services/AppContext'

export default function MyRegistrationsPage() {
  const { registrations, unregisterFromWebinar, loading } = useApp()
  const [sortedRegistrations, setSortedRegistrations] = useState([])

  useEffect(() => {
    const sorted = [...registrations].sort((a, b) => {
      return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
    })
    setSortedRegistrations(sorted)
  }, [registrations])

  const handleUnregister = async (registrationId) => {
    if (confirm('Are you sure you want to cancel this registration?')) {
      await unregisterFromWebinar(registrationId)
    }
  }

  return (
    <div>
      <Topbar 
        title="My Registrations" 
        subtitle={`You are registered for ${registrations.length} webinar${registrations.length !== 1 ? 's' : ''}.`}
      />
      
      {loading ? (
        <div className="page-shell py-16">
          <GlassCard className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-500" />
            <p className="mt-4 text-slate-300">Loading registrations...</p>
          </GlassCard>
        </div>
      ) : registrations.length === 0 ? (
        <div className="page-shell py-16">
          <GlassCard className="p-12 text-center">
            <p className="text-slate-300">No registrations yet. Explore the dashboard to reserve a seat.</p>
          </GlassCard>
        </div>
      ) : (
        <div className="page-shell py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedRegistrations.map((registration) => (
              <RegistrationCard
                key={registration.id}
                registration={registration}
                onUnregister={handleUnregister}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

