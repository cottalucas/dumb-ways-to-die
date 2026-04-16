import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Send } from 'lucide-react'
import { ChatBubble, TypingIndicator } from '../components/chat/ChatBubble'
import { QuickReplies } from '../components/chat/QuickReplies'
import { useUser } from '../context/UserContext'
import { chatResponses, quickReplies as defaultReplies } from '../data/messages'
import { subscribeToMessages, addMessage, ChatMessage } from '../services/chatService'

export function Chat() {
  const navigate = useNavigate()
  const { userId, name } = useUser()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [chips, setChips] = useState(defaultReplies)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Subscribe to real-time messages
  useEffect(() => {
    const unsub = subscribeToMessages(userId, msgs => {
      setMessages(msgs)
      // Seed greeting messages on first load if collection is empty
      if (msgs.length === 0 && !seeded) {
        setSeeded(true)
        Promise.all([
          addMessage(userId, { sender: 'ai', text: `Hi ${name}! I'm here to help with your exercises, answer questions, and keep you motivated.` }),
          addMessage(userId, { sender: 'ai', text: "What would you like to talk about today?" }),
        ]).catch(() => setError('Could not load chat.'))
      }
    })
    return unsub
  }, [userId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSelect = async (option: string) => {
    setTyping(true)
    setChips([])

    try {
      await addMessage(userId, { sender: 'user', text: option })

      await new Promise(r => setTimeout(r, 900))

      const response = chatResponses[option]
      await addMessage(userId, {
        sender: 'ai',
        text: response?.text ?? "I'm not sure about that, but your doctor or physio would be a great resource.",
      })

      setChips(response?.followUp ?? defaultReplies)
    } catch {
      setError('Message could not be sent.')
      setChips(defaultReplies)
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center h-14 px-4 border-b border-surface-border bg-white gap-3 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-base font-semibold text-text-primary">Your Companion</h1>
        <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center">
          <MessageCircle size={16} className="text-white" />
        </div>
      </div>

      {error && <p className="text-xs text-accent-red text-center py-1 bg-red-50">{error}</p>}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {messages.map(msg => (
          <ChatBubble key={msg.id ?? msg.timestamp.toISOString()} sender={msg.sender} text={msg.text} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies + input */}
      <div className="border-t border-surface-border bg-white flex-shrink-0">
        <div className="py-3">
          <QuickReplies options={chips} onSelect={handleSelect} disabled={typing} />
        </div>
        <div className="flex items-center gap-3 px-4 pb-4">
          <div className="flex-1 h-11 rounded-full border border-surface-border bg-surface px-4 flex items-center">
            <span className="text-sm text-text-muted">Type a message...</span>
          </div>
          <button className="w-11 h-11 rounded-full bg-surface-border flex items-center justify-center opacity-40" disabled>
            <Send size={16} className="text-text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}
