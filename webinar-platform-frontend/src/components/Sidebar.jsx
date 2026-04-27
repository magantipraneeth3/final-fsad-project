import {
  BookOpenCheck,
  CalendarRange,
  FileStack,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const userLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/registrations', label: 'My Registrations', icon: CalendarRange },
  { to: '/dashboard/resources', label: 'Resources', icon: FileStack },
]

const adminLinks = [
  { to: '/admin', label: 'Admin Overview', icon: ShieldCheck },
]

export default function Sidebar({ role }) {
  const links = role === 'ADMIN' ? adminLinks : userLinks

  return (
    <aside className="glass hidden min-h-[calc(100vh-2rem)] w-72 rounded-[2rem] p-6 lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-pink-500 p-3 text-white">
          <BookOpenCheck size={20} />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white light:text-slate-900">Praneeth Webinars</h2>
          <p className="text-xs text-slate-400 light:text-slate-600">Learning Command Center</p>
        </div>
      </div>

      <div className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                  : 'text-slate-300 hover:bg-white/10 light:text-slate-700'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-cyan-400/30 p-4">
        <div className="flex items-center gap-3 text-cyan-200 light:text-cyan-700">
          <Settings size={16} />
          <span className="text-sm font-medium">Built for live learning</span>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-400 light:text-slate-600">
          Track sessions, keep registrations organized, and deliver post-event resources from one place.
        </p>
      </div>
    </aside>
  )
}
