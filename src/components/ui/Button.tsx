import React from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type Size = 'default' | 'sm'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'default',
  fullWidth,
  leftIcon,
  rightIcon,
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-btn transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

  const variants: Record<Variant, string> = {
    primary: 'bg-teal text-white hover:bg-teal-dark shadow-sm',
    secondary: 'border-2 border-teal text-teal bg-white hover:bg-teal-light',
    ghost: 'text-teal hover:bg-teal-light',
    destructive: 'text-accent-red hover:bg-red-50',
  }

  const sizes: Record<Size, string> = {
    default: 'h-16 px-6 text-lg',   // 64px — clear tap target for elderly
    sm: 'h-14 px-5 text-base',      // 56px — still well above 44px minimum
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
