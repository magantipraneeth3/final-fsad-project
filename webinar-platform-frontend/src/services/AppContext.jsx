import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'
import { authApi, registrationApi, resourceApi, webinarApi } from './api'
import { initialRegistrations, initialWebinars } from './mockData'
import { storage } from './storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => storage.get('edu-user', null))
  const [theme, setTheme] = useState(() => storage.get('edu-theme', 'dark'))
  const [webinars, setWebinars] = useState(() => storage.get('edu-webinars', initialWebinars))
  const [registrations, setRegistrations] = useState(() =>
    storage.get('edu-registrations', initialRegistrations),
  )
  const [toasts, setToasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
    storage.set('edu-theme', theme)
  }, [theme])

  useEffect(() => {
    storage.set('edu-user', user)
  }, [user])

  useEffect(() => {
    storage.set('edu-webinars', webinars)
  }, [webinars])

  useEffect(() => {
    storage.set('edu-registrations', registrations)
  }, [registrations])

  useEffect(() => {
    let mounted = true

    const loadInitialData = async () => {
      try {
        const webinarsData = await webinarApi.list()
        let registrationData = []

        if (user?.token) {
          registrationData =
            user.role === 'ADMIN'
              ? await registrationApi.all().catch(() => [])
              : await registrationApi.mine().catch(() => [])
        }

        if (!mounted) return

        startTransition(() => {
          setWebinars(webinarsData)
          setRegistrations(registrationData)
        })
      } catch {
        if (!mounted) return

        startTransition(() => {
          setWebinars(storage.get('edu-webinars', initialWebinars))
          setRegistrations(storage.get('edu-registrations', initialRegistrations))
        })
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadInitialData()

    return () => {
      mounted = false
    }
  }, [user?.token])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((current) => [...current, { id, message, type }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3000)
  }

  const login = async ({ email, password }) => {
    if (!email || !password) {
      addToast('Please enter email and password.', 'error')
      return false
    }

    try {
      const response = await authApi.login({ email, password })
      const session = {
        ...response.user,
        token: response.token,
      }

      setUser(session)
      addToast(`Welcome back, ${session.name}.`)
      return session
    } catch (error) {
      addToast(error.response?.data?.message || 'Login failed.', 'error')
      return false
    }
  }

  const register = async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      addToast('Please complete all registration fields.', 'error')
      return false
    }

    try {
      const response = await authApi.register({ name, email, password, role })
      const session = {
        ...response.user,
        token: response.token,
      }

      setUser(session)
      addToast('Account created successfully.')
      return session
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed.', 'error')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setRegistrations([])
    addToast('Signed out successfully.')
  }

  const registerForWebinar = async (webinarId) => {
    if (!user) return

    const alreadyRegistered = registrations.some(
      (item) => String(item.webinarId) === String(webinarId),
    )

    if (alreadyRegistered) {
      addToast('You are already registered for this webinar.', 'error')
      return
    }

    try {
      await registrationApi.create(webinarId)
      const refreshed = await registrationApi.mine()
      setRegistrations(refreshed)
      addToast('Registration confirmed.')
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed.', 'error')
    }
  }

  const createWebinar = async (payload) => {
    try {
      const created = await webinarApi.create(payload)
      setWebinars((current) => [created, ...current])
      addToast('Webinar scheduled successfully.')
      return true
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to create webinar.', 'error')
      return false
    }
  }

  const deleteWebinar = async (webinarId) => {
    try {
      await webinarApi.remove(webinarId)
      setWebinars((current) => current.filter((webinar) => String(webinar.id) !== String(webinarId)))
      setRegistrations((current) =>
        current.filter((item) => String(item.webinarId) !== String(webinarId)),
      )
      addToast('Webinar removed.')
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to delete webinar.', 'error')
    }
  }

  const uploadResource = async (webinarId, fileName) => {
    try {
      const resource = await resourceApi.create(webinarId, fileName)
      setWebinars((current) =>
        current.map((webinar) =>
          String(webinar.id) === String(webinarId)
            ? {
                ...webinar,
                resources: [...webinar.resources, resource],
              }
            : webinar,
        ),
      )
      addToast('Resource uploaded to webinar.')
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to upload resource.', 'error')
    }
  }

  const unregisterFromWebinar = async (registrationId) => {
    try {
      await registrationApi.delete(registrationId)
      setRegistrations((current) =>
        current.filter((item) => String(item.id) !== String(registrationId))
      )
      addToast('Registration cancelled successfully.')
      return true
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to cancel registration.', 'error')
      return false
    }
  }

  const checkRegistrationStatus = async (webinarId) => {
    if (!user) return false
    try {
      const { isRegistered } = await registrationApi.checkStatus(webinarId)
      return isRegistered
    } catch {
      return registrations.some((item) => String(item.webinarId) === String(webinarId))
    }
  }

  const value = useMemo(
    () => ({
      user,
      theme,
      setTheme,
      webinars,
      registrations,
      login,
      register,
      logout,
      registerForWebinar,
      unregisterFromWebinar,
      checkRegistrationStatus,
      createWebinar,
      deleteWebinar,
      uploadResource,
      toasts,
      addToast,
      loading: loading || isPending,
    }),
    [user, theme, webinars, registrations, toasts, loading, isPending],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
