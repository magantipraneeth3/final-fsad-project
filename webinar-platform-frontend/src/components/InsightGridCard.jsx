import GlassCard from './GlassCard'

export default function InsightGridCard({ title, metrics }) {
  return (
    <GlassCard className="p-6">
      <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">{title}</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/80"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 light:text-slate-500">{metric.label}</p>
            <p className="mt-3 font-display text-2xl font-bold text-white light:text-slate-900">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{metric.helper}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
