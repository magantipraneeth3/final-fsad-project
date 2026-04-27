import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

export default function ActionTile({ icon: Icon, title, text, tone = 'cyan' }) {
  const tones = {
    cyan: 'from-cyan-400 to-blue-500',
    pink: 'from-pink-400 to-rose-500',
    violet: 'from-violet-400 to-fuchsia-500',
    emerald: 'from-emerald-400 to-teal-500',
    amber: 'from-amber-400 to-orange-500',
  }

  return (
    <motion.div whileHover={{ y: -6 }}>
      <GlassCard className="h-full p-5">
        <div className={`inline-flex rounded-2xl bg-gradient-to-br ${tones[tone]} p-3 text-white`}>
          <Icon size={18} />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-white light:text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">{text}</p>
      </GlassCard>
    </motion.div>
  )
}
