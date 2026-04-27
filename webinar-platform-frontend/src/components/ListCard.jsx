import GlassCard from './GlassCard'
import Pill from './Pill'

export default function ListCard({ title, subtitle, items = [] }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{subtitle}</p> : null}
        </div>
        <Pill>{items.length} items</Pill>
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 light:border-slate-200 light:bg-white/80"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white light:text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600">{item.meta}</p>
              </div>
              {item.badge ? <Pill className={item.badgeClassName || ''}>{item.badge}</Pill> : null}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
