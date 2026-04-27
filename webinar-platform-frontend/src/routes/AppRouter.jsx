import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToHash from '../components/ScrollToHash'
import ToastContainer from '../components/ToastContainer'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserDashboardPage from '../pages/UserDashboardPage'
import MyRegistrationsPage from '../pages/MyRegistrationsPage'
import ResourcesPage from '../pages/ResourcesPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import WebinarDetailsPage from '../pages/WebinarDetailsPage'
import NotFoundPage from '../pages/NotFoundPage'

function PublicShell({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default function AppRouter() {
  const location = useLocation()

  return (
    <>
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PublicShell><HomePage /></PublicShell>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/webinars/:id" element={<PublicShell><WebinarDetailsPage /></PublicShell>} />

          <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route element={<DashboardLayout role="USER" />}>
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/dashboard/registrations" element={<MyRegistrationsPage />} />
              <Route path="/dashboard/resources" element={<ResourcesPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<DashboardLayout role="ADMIN" />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </>
  )
}
