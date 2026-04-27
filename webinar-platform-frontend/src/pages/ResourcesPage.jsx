import { useEffect, useState } from 'react'
import ResourceCard from '../components/ResourceCard'
import Topbar from '../components/Topbar'
import { webinarApi } from '../services/api'
import { useApp } from '../services/AppContext'

export default function ResourcesPage() {
  const { webinars, registrations, user } = useApp()
  const [resourceWebinars, setResourceWebinars] = useState([])

  useEffect(() => {
    const loadResources = async () => {
      if (!user || user.role === 'ADMIN') {
        setResourceWebinars([])
        return
      }

      const accessibleIds = registrations.map((item) => item.webinarId)
      const baseWebinars = webinars.filter((webinar) =>
        accessibleIds.some((id) => String(id) === String(webinar.id)),
      )

      const detailed = await Promise.all(
        baseWebinars.map(async (webinar) => {
          try {
            return await webinarApi.details(webinar.id)
          } catch {
            return webinar
          }
        }),
      )

      setResourceWebinars(detailed)
    }

    loadResources()
  }, [registrations, user, webinars])

  return (
    <div>
      <Topbar title="Recordings & Resources" subtitle="Rewatch sessions and download workshop materials anytime." />
      <div className="grid gap-6">
        {resourceWebinars.map((webinar) => (
          <ResourceCard key={webinar.id} webinar={webinar} />
        ))}
        {!resourceWebinars.length ? (
          <div className="glass rounded-[2rem] p-10 text-center text-slate-400 light:text-slate-600">
            Register for a webinar to unlock recordings, PDFs, and workshop files.
          </div>
        ) : null}
      </div>
    </div>
  )
}
