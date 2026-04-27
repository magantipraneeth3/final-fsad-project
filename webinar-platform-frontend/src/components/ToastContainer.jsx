import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { useApp } from '../services/AppContext'

export default function ToastContainer() {
  const { toasts } = useApp()

  return (
    <div className="fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass flex items-center gap-3 rounded-2xl p-4"
          >
            {toast.type === 'error' ? <CircleAlert className="text-rose-400" size={18} /> : <CircleCheck className="text-emerald-400" size={18} />}
            <p className="text-sm text-slate-100 light:text-slate-800">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
