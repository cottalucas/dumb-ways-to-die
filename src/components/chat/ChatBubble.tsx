import { MessageCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ChatBubbleProps {
  sender: 'ai' | 'user'
  text: string
}

export function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isAI = sender === 'ai'

  return (
    <div className={cn('flex gap-3 mb-4', isAI ? 'items-start' : 'items-start flex-row-reverse')}>
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-teal flex-shrink-0 flex items-center justify-center mt-1">
          <MessageCircle size={14} className="text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[82%] px-4 py-3 rounded-2xl text-base leading-relaxed',
          isAI
            ? 'bg-ai-bubble text-text-primary rounded-tl-sm'
            : 'bg-teal text-white rounded-tr-sm',
        )}
      >
        {text}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 items-start">
      <div className="w-8 h-8 rounded-full bg-teal flex-shrink-0 flex items-center justify-center mt-1">
        <MessageCircle size={14} className="text-white" />
      </div>
      <div className="bg-ai-bubble px-5 py-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
        <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce-dot-1" />
        <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce-dot-2" />
        <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce-dot-3" />
      </div>
    </div>
  )
}
