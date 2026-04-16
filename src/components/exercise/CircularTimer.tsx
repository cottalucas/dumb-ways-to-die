import { useEffect } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { cn } from '../../lib/utils'

interface CircularTimerProps {
  totalSeconds: number
  autoStart?: boolean
  onComplete?: () => void
  paused?: boolean
  className?: string
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function CircularTimer({ totalSeconds, autoStart, onComplete, paused, className }: CircularTimerProps) {
  const { seconds, running, start, pause, reset } = useTimer(totalSeconds, onComplete)

  useEffect(() => {
    if (autoStart) {
      reset(totalSeconds)
      start()
    }
  }, [autoStart, totalSeconds])

  useEffect(() => {
    if (paused && running) pause()
    if (!paused && !running && seconds > 0 && autoStart) start()
  }, [paused])

  const progress = (totalSeconds - seconds) / totalSeconds
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative">
        <svg width="136" height="136" viewBox="0 0 136 136" className="-rotate-90">
          <circle cx="68" cy="68" r={RADIUS} fill="none" stroke="#E6F5F3" strokeWidth="8" />
          <circle
            cx="68"
            cy="68"
            r={RADIUS}
            fill="none"
            stroke="#1A8A7D"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-5xl font-semibold text-text-primary leading-none">{seconds}</span>
          <span className="text-xs text-text-muted mt-1">sec</span>
        </div>
      </div>
      <p className="text-base text-text-secondary">Hold steady...</p>
    </div>
  )
}
