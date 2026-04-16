import React from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated'
  padding?: 'default' | 'none'
}

export function Card({ variant = 'default', padding = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-card rounded-card border border-surface-border',
        variant === 'default' ? 'shadow-card' : 'shadow-elevated',
        padding === 'default' && 'p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
