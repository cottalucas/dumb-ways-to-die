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
        {showTabBar ? (
          // Scrollable layout: padding lives on the inner div (not the scroll container)
          // so browsers honour it correctly as part of the scrollable content.
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="animate-fade-slide-in pb-[84px]">
              {children}
            </div>
          </div>
        ) : (
          // Full-height layout: flex column so screens can use flex-1 to fill the frame.
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="animate-fade-slide-in flex-1 flex flex-col">
              {children}
            </div>
          </div>
        )}
        {showTabBar && (
          <div className="absolute bottom-0 left-0 right-0">
            <TabBar />
          </div>
        )}
      </div>
    </div>
  )
}
