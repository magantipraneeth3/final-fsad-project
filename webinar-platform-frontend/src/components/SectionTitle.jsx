export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 light:text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl light:text-slate-900">
        {title}
      </h2>
      <p className="mt-4 text-slate-400 light:text-slate-600">{text}</p>
    </div>
  )
}
