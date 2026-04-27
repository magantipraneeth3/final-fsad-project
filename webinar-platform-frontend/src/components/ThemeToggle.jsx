import { MoonStar, SunMedium } from 'lucide-react'
import { useApp } from '../services/AppContext'

export default function ThemeToggle() {
  const { theme, setTheme } = useApp()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="glass inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-100 transition hover:scale-105 light:text-slate-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  )
}
