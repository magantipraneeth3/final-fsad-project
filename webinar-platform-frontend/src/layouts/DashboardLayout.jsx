import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ role }) {
  return (
    <div className="page-shell py-4">
      <div className="grid gap-6 lg:grid-cols-[288px_minmax(0,1fr)]">
        <Sidebar role={role} />
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
