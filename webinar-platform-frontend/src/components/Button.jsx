import { motion } from 'framer-motion'

export default function Button({
  children,
  className = '',
  variant = 'primary',
  as: Component = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white shadow-glow hover:opacity-95',
    secondary: 'glass text-slate-100 hover:border-cyan-300/40 hover:bg-white/15 light:text-slate-900',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/10 light:text-slate-700',
    danger: 'bg-rose-500/90 text-white hover:bg-rose-500',
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Component
        className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  )
}
