import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div whileHover={{ y: -8 }}>
      <GlassCard className="h-full p-6">
        <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 p-3 text-white">
          <Icon size={22} />
        </div>
        <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">{description}</p>
      </GlassCard>
    </motion.div>
  )
}
