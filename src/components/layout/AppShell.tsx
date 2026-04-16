import React from 'react'
import { TabBar } from './TabBar'
import { cn } from '../../lib/utils'

interface AppShellProps {
  children: React.ReactNode
  showTabBar?: boolean
}

export function AppShell({ children, showTabBar }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center md:items-center md:py-8">
      <div
        className={cn(
          'relative w-full bg-surface overflow-hidden flex flex-col',
          'md:max-w-[390px] md:rounded-[40px] md:shadow-2xl',
          'min-h-screen md:min-h-0 md:h-[844px]',
        )}
        style={{ maxHeight: '100dvh' }}
      >
        <div className={cn('flex-1 overflow-y-auto overflow-x-hidden', showTabBar && 'pb-[72px]')}>
          <div className="animate-fade-slide-in">
            {children}
          </div>
        </div>
        {showTabBar && (
          <div className="absolute bottom-0 left-0 right-0">
            <TabBar />
          </div>
        )}
      </div>
    </div>
  )
}
