import { Link } from 'react-router-dom'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'

export default function NotFoundPage() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center py-10">
      <GlassCard className="max-w-xl p-10 text-center">
        <h1 className="font-display text-4xl font-bold text-white light:text-slate-900">Page not found</h1>
        <p className="mt-4 text-slate-400 light:text-slate-600">
          The page you were looking for has moved or does not exist.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  )
}
