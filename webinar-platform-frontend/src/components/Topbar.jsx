import { Bell, LogOut } from 'lucide-react'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import { useApp } from '../services/AppContext'

export default function Topbar({ title, subtitle }) {
  const { user, logout } = useApp()

  return (
    <div className="glass mb-6 flex flex-col gap-4 rounded-[2rem] p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-white light:text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300 light:text-slate-700 md:block">
          {user?.name} | {user?.role}
        </div>
        <button className="glass inline-flex h-11 w-11 items-center justify-center rounded-2xl">
          <Bell size={18} />
        </button>
        <ThemeToggle />
        <Button variant="secondary" onClick={logout} className="gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  )
}
