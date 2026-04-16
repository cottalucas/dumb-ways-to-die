import { useLocation, useNavigate } from 'react-router-dom'
import { Home, BarChart2, User } from 'lucide-react'
import { cn } from '../../lib/utils'

const tabs = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Fortschritt', icon: BarChart2, path: '/progress' },
  { label: 'Profil', icon: User, path: '/profile' },
]

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="h-[84px] bg-white border-t border-warm-border flex safe-bottom">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1.5 pt-2 transition-colors',
              active ? 'text-warm-text' : 'text-warm-muted',
            )}
            aria-label={label}
          >
            <Icon
              size={28}
              strokeWidth={active ? 2.5 : 1.8}
              className={active ? 'text-warm-text' : 'text-warm-muted'}
            />
            <span className={cn('text-[13px] font-semibold', active ? 'text-warm-text' : 'text-warm-muted')}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
