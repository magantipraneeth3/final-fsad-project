import { Calendar, User, Trash2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './Button'
import GlassCard from './GlassCard'

export default function RegistrationCard({
  registration,
  onUnregister,
}) {
  const { id, title, speaker, date, time, status, webinarId } = registration

  return (
    <GlassCard className="overflow-hidden">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-white light:text-slate-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{speaker}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === 'UPCOMING'
              ? 'bg-cyan-400/15 text-cyan-200 light:text-cyan-700'
              : 'bg-slate-400/15 text-slate-300 light:text-slate-600'
          }`}>
            {status}
          </span>
        </div>

        <div className="mb-6 space-y-2 text-sm text-slate-300 light:text-slate-700">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-cyan-300 light:text-cyan-700" />
            <span>{date} at {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-cyan-300 light:text-cyan-700" />
            <span>{speaker}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={`/webinars/${webinarId}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              <ExternalLink size={16} />
              View Details
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => onUnregister(id)}
            className="flex items-center gap-2"
          >
            <Trash2 size={16} />
            Cancel
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
