import GlassCard from './GlassCard'

export default function TestimonialCard({ quote, name, role }) {
  return (
    <GlassCard className="h-full p-6">
      <p className="text-sm leading-7 text-slate-300 light:text-slate-700">"{quote}"</p>
      <div className="mt-6">
        <p className="font-semibold text-white light:text-slate-900">{name}</p>
        <p className="text-sm text-slate-400 light:text-slate-600">{role}</p>
      </div>
    </GlassCard>
  )
}
