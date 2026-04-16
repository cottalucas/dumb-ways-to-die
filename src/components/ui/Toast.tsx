import { useEffect } from 'react'
import { cn } from '../../lib/utils'

interface ToastProps {
  message: string
  visible: boolean
  onHide: () => void
}

export function Toast({ message, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2500)
      return () => clearTimeout(t)
    }
  }, [visible, onHide])

  if (!visible) return null

  return (
    <div className={cn(
      'fixed top-6 left-1/2 -translate-x-1/2 z-50',
      'bg-text-primary text-white text-sm font-medium px-5 py-3 rounded-full shadow-elevated',
      'animate-slide-down',
    )}>
      {message}
    </div>
  )
}
