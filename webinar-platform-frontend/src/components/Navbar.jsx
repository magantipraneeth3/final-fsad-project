import { Menu, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import { useApp } from '../services/AppContext'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Features', id: 'features' },
  { label: 'Webinars', id: 'webinars' },
  { label: 'Testimonials', id: 'testimonials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSectionNav = (id) => {
    setOpen(false)

    if (location.pathname === '/') {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.replaceState(null, '', '/')
        return
      }

      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', `/#${id}`)
      }
      return
    }

    navigate(id === 'home' ? '/' : `/#${id}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl light:bg-white/70">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 text-white shadow-glow">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white light:text-slate-900">Praneeth Webinars</p>
            <p className="text-xs text-slate-400 light:text-slate-600">Learn live. Grow faster.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSectionNav(item.id)}
              className="text-sm text-slate-300 transition hover:text-white light:text-slate-600 light:hover:text-slate-900"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {user ? (
            <Link to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}>
              <Button variant="secondary">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((current) => !current)}
          className="glass inline-flex h-11 w-11 items-center justify-center rounded-2xl md:hidden"
        >
          <Menu size={18} />
        </button>
      </div>

      {open ? (
        <div className="page-shell pb-4 md:hidden">
          <div className="glass rounded-3xl p-4">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSectionNav(item.id)}
                  className="rounded-2xl px-3 py-2 text-left text-sm text-slate-200 light:text-slate-700"
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
              <Link to="/login">
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
