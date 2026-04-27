import GlassCard from './GlassCard'

export default function StatsCard({ label, value, helper, icon: Icon }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600">{label}</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-white light:text-slate-900">{value}</h3>
          {helper ? <p className="mt-2 text-sm text-cyan-300 light:text-cyan-700">{helper}</p> : null}
        </div>
        {Icon ? (
          <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 p-3 text-white">
            <Icon size={18} />
          </div>
        ) : null}
      </div>
    </GlassCard>
  )
}
