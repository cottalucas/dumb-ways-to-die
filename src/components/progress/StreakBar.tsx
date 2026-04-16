import { cn } from '../../lib/utils'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

interface StreakBarProps {
  dailyActivity: boolean[]
  todayIndex?: number
}

export function StreakBar({ dailyActivity, todayIndex = 3 }: StreakBarProps) {
  return (
    <div className="flex gap-2 justify-between">
      {DAY_LABELS.map((label, i) => {
        const done = dailyActivity[i] ?? false
        const isToday = i === todayIndex
        const isPast = i < todayIndex
        const isFuture = i > todayIndex

        return (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold',
                done && !isToday && 'bg-teal text-white',
                isToday && done && 'bg-teal text-white animate-streak-pulse',
                isToday && !done && 'border-2 border-teal text-teal animate-streak-pulse',
                !done && isPast && 'border-2 border-surface-border text-text-muted',
                !done && isFuture && 'border border-surface-border text-text-muted opacity-40',
              )}
            >
              {done ? (isToday ? '●' : '✓') : ''}
            </div>
            <span className={cn('text-[11px]', isToday ? 'text-teal font-bold' : 'text-text-muted')}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
