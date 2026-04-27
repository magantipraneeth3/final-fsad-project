import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import InputField from '../components/InputField'
import ThemeToggle from '../components/ThemeToggle'
import { useApp } from '../services/AppContext'

export default function RegisterPage() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (form.name.trim().length < 3) nextErrors.name = 'Name must be at least 3 characters.'
    if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email address.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const session = await register(form)
    if (session) navigate(session.role === 'ADMIN' ? '/admin' : '/dashboard')
  }

  return (
    <div className="page-shell flex min-h-screen items-center justify-center py-10">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>
        <GlassCard className="p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 light:text-cyan-700">Create Account</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-white light:text-slate-900">Join the webinar community</h1>
          <p className="mt-3 text-slate-400 light:text-slate-600">
            Sign up as a learner or admin and start managing high-impact online events.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              placeholder="Your full name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              error={errors.name}
            />
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
              placeholder="Create a secure password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              error={errors.password}
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
            <p className="text-sm text-slate-400 light:text-slate-600">
              Already have an account? <Link to="/login" className="text-cyan-300 light:text-cyan-700">Login</Link>
            </p>
            <Button className="w-full" type="submit">Create Account</Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  )
}
