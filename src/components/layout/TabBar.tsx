import { useLocation, useNavigate } from 'react-router-dom'
import { Home, BarChart2, User } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useLang } from '../../context/LanguageContext'

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLang()

  const tabs = [
    { label: t.nav.home, icon: Home, path: '/home' },
    { label: t.nav.progress, icon: BarChart2, path: '/progress' },
    { label: t.nav.profile, icon: User, path: '/profile' },
  ]

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
            <Icon size={28} strokeWidth={active ? 2.5 : 1.8} />
            <span className={cn('text-[13px] font-semibold', active ? 'text-warm-text' : 'text-warm-muted')}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
