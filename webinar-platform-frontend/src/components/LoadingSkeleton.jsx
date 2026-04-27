export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-24 animate-pulse rounded-3xl border border-white/10 bg-white/5 light:border-slate-200 light:bg-slate-100"
        />
      ))}
    </div>
  )
}
