import { useEffect, useState } from 'react'

function getTimeLeft(date, time) {
  const target = new Date(`${date}T${time}:00`)
  const diff = target.getTime() - Date.now()

  if (diff <= 0) return 'Live now'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  return `${days}d ${hours}h ${minutes}m`
}

export default function CountdownTimer({ date, time }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(date, time))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(date, time)), 60000)
    return () => clearInterval(timer)
  }, [date, time])

  return (
    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200 light:text-cyan-700">
      Starts in {timeLeft}
    </span>
  )
}
