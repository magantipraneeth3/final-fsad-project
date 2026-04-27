export default function InputField({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-200 light:text-slate-700">{label}</span>
      <input
        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 light:border-slate-200 light:bg-white/80 light:text-slate-900 ${className}`}
        {...props}
      />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </label>
  )
}
