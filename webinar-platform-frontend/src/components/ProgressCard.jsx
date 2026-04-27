import GlassCard from './GlassCard'

export default function ProgressCard({ title, value, progress, helper }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600">{title}</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-white light:text-slate-900">{value}</h3>
        </div>
        <p className="text-sm font-semibold text-cyan-300 light:text-cyan-700">{progress}%</p>
      </div>
      <div className="mt-4 h-3 rounded-full bg-white/10 light:bg-slate-200">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-400 light:text-slate-600">{helper}</p>
    </GlassCard>
  )
}
