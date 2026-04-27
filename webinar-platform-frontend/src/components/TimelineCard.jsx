import GlassCard from './GlassCard'
import Pill from './Pill'

export default function TimelineCard({ title, items }) {
  return (
    <GlassCard className="p-6">
      <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">{title}</h3>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="mt-1 flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
              <div className="mt-2 h-full w-px bg-white/10 light:bg-slate-200" />
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/80">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white light:text-slate-900">{item.title}</p>
                <Pill>{item.time}</Pill>
              </div>
              <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
