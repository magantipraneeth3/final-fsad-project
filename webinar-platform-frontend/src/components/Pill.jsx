export default function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 light:border-slate-200 light:bg-white/80 light:text-slate-700 ${className}`}
    >
      {children}
    </span>
  )
}
