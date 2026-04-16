import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ScreenHeaderProps {
  title?: string
  backPath?: string
  onBack?: () => void
  rightAction?: React.ReactNode
  closeMode?: boolean
  className?: string
}

export function ScreenHeader({ title, backPath, onBack, rightAction, closeMode, className }: ScreenHeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (backPath) {
      navigate(backPath)
    } else {
      navigate(-1)
    }
  }

  const BackIcon = closeMode ? X : ArrowLeft

  return (
    <div className={cn('flex items-center h-14 px-4 gap-3', className)}>
      {(backPath !== undefined || onBack) && (
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider transition-colors -ml-1"
          aria-label={closeMode ? 'Close' : 'Go back'}
        >
          <BackIcon size={22} className="text-text-primary" />
        </button>
      )}
      {title && (
        <h1 className="flex-1 text-lg font-semibold text-text-primary truncate">{title}</h1>
      )}
      {rightAction && <div className="ml-auto">{rightAction}</div>}
    </div>
  )
}
