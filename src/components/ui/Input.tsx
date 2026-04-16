import React from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'h-16 px-4 text-xl rounded-btn border-2 border-surface-border bg-white',
          'focus:outline-none focus:border-teal',
          'placeholder:text-text-muted',
          error && 'border-accent-red focus:border-accent-red',
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-accent-red">{error}</p>}
    </div>
  )
}
