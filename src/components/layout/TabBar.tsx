import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, User } from 'lucide-react'
import { cn } from '../../lib/utils'

const tabs = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Exercises', icon: Dumbbell, path: '/exercises' },
  { label: 'Progress', icon: TrendingUp, path: '/progress' },
  { label: 'Profile', icon: User, path: '/profile' },
]

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="h-[72px] bg-white border-t border-surface-border shadow-tabbar flex safe-bottom">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1 pt-2 transition-colors',
              active ? 'text-teal' : 'text-text-muted',
            )}
            aria-label={label}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[11px] font-semibold">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
