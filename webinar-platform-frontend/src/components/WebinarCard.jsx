import { CalendarDays, PlayCircle, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from './Button'
import CountdownTimer from './CountdownTimer'
import GlassCard from './GlassCard'

export default function WebinarCard({ webinar, onRegister, showActions = true }) {
  return (
    <motion.div whileHover={{ y: -10 }}>
      <GlassCard className="overflow-hidden">
        <img src={webinar.image} alt={webinar.title} className="h-52 w-full object-cover" />
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-semibold text-pink-200 light:text-pink-700">
              {webinar.category}
            </span>
            <CountdownTimer date={webinar.date} time={webinar.time} />
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-white light:text-slate-900">
              {webinar.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">
              {webinar.description}
            </p>
          </div>

          <div className="grid gap-2 text-sm text-slate-300 light:text-slate-700">
            <p className="flex items-center gap-2"><CalendarDays size={16} /> {webinar.date} at {webinar.time}</p>
            <p className="flex items-center gap-2"><PlayCircle size={16} /> {webinar.speaker}</p>
            <p className="flex items-center gap-2"><UsersRound size={16} /> {webinar.attendees}+ learners</p>
          </div>

          {showActions ? (
            <div className="flex flex-wrap gap-3">
              <Link to={`/webinars/${webinar.id}`}>
                <Button variant="secondary">View Details</Button>
              </Link>
              <Button onClick={() => onRegister?.(webinar.id)}>Register</Button>
            </div>
          ) : null}
        </div>
      </GlassCard>
    </motion.div>
  )
}
