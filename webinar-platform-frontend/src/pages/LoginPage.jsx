import { motion } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import InputField from '../components/InputField'
import ThemeToggle from '../components/ThemeToggle'
import { useApp } from '../services/AppContext'

function createCaptcha() {
  const first = Math.floor(Math.random() * 9) + 1
  const second = Math.floor(Math.random() * 9) + 1
  return { first, second, answer: first + second }
}

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'USER', captcha: '' })
  const [errors, setErrors] = useState({})
  const [captcha, setCaptcha] = useState(createCaptcha)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email address.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'
    if (Number(form.captcha) !== captcha.answer) nextErrors.captcha = 'Please solve the captcha correctly.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setCaptcha(createCaptcha())
      setForm((current) => ({ ...current, captcha: '' }))
      return
    }

    const session = await login(form)
    if (session) navigate(session.role === 'ADMIN' ? '/admin' : '/dashboard')
  }

  return (
    <div className="page-shell flex min-h-screen items-center justify-center py-10">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>
        <GlassCard className="p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 light:text-cyan-700">Welcome Back</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-white light:text-slate-900">Login to your learning hub</h1>
          <p className="mt-3 text-slate-400 light:text-slate-600">
            Access live sessions, your registrations, recordings, and workshop materials.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              error={errors.password}
            />
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/80">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-200 light:text-slate-700">Captcha Verification</p>
                  <p className="mt-2 font-display text-2xl font-bold text-white light:text-slate-900">
                    {captcha.first} + {captcha.second} = ?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCaptcha(createCaptcha())
                    setForm((current) => ({ ...current, captcha: '' }))
                  }}
                  className="glass inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  aria-label="Refresh captcha"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
            </div>
            <InputField
              label="Captcha Answer"
              type="number"
              placeholder="Enter the answer"
              value={form.captcha}
              onChange={(event) => setForm({ ...form, captcha: event.target.value })}
              error={errors.captcha}
            />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200 light:text-slate-700">Role</span>
              <select
                value={form.role}
                onChange={(event) => setForm({ ...form, role: event.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 light:border-slate-200 light:bg-white/80 light:text-slate-900"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
            <div className="flex items-center justify-between">
              <button type="button" className="text-sm text-cyan-300 light:text-cyan-700">Forgot Password?</button>
              <Link to="/register" className="text-sm text-slate-300 light:text-slate-700">Create account</Link>
            </div>
            <Button className="w-full" type="submit">Login</Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
