import { Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 light:border-slate-200">
      <div className="page-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">
            Educational webinars that feel premium.
          </h3>
          <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
            Contact: hello@praneethwebinars.io | +91 98765 43210
          </p>
        </div>
        <div className="flex items-center gap-3 text-slate-300 light:text-slate-700">
          <a className="glass rounded-2xl p-3" href="https://twitter.com"> <Twitter size={18} /> </a>
          <a className="glass rounded-2xl p-3" href="https://linkedin.com"> <Linkedin size={18} /> </a>
          <a className="glass rounded-2xl p-3" href="https://instagram.com"> <Instagram size={18} /> </a>
        </div>
      </div>
    </footer>
  )
}
