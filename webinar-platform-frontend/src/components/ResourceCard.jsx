import { Download, PlayCircle } from 'lucide-react'
import GlassCard from './GlassCard'
import Button from './Button'

export default function ResourceCard({ webinar }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-slate-950/50 p-6 light:bg-slate-100">
          <div className="aspect-video rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 p-6">
            <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-cyan-300/30">
              <PlayCircle size={46} className="text-cyan-300" />
              <p className="mt-4 text-sm text-slate-300 light:text-slate-700">Recorded session preview player</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 light:text-cyan-700">Resource Vault</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white light:text-slate-900">{webinar.title}</h3>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">Speaker: {webinar.speaker}</p>
          </div>
          <div className="space-y-3">
            {webinar.resources.map((resource) => (
              <div
                key={resource.name}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 light:border-slate-200 light:bg-white/80"
              >
                <div>
                  <p className="text-sm font-medium text-white light:text-slate-900">{resource.name}</p>
                  <p className="text-xs text-slate-400 light:text-slate-600">{resource.type.toUpperCase()}</p>
                </div>
                <Button variant="secondary" className="gap-2">
                  <Download size={14} />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
