import { Check, Clock } from 'lucide-react'

export default function RegistrationStatus({ isRegistered, status }) {
  if (!isRegistered) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-green-400/15 px-4 py-2">
      <Check size={18} className="text-green-300 light:text-green-700" />
      <span className="text-sm font-semibold text-green-300 light:text-green-700">
        {status === 'UPCOMING' ? 'You are registered' : 'Webinar completed'}
      </span>
    </div>
  )
}
