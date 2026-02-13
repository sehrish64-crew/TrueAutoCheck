"use client"

import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Send, X, User } from 'lucide-react'
import { useTranslations } from '@/lib/translations'
import { useCountry } from '@/contexts/CountryContext'

const FAQ_QUESTIONS = [
  'What is a vehicle inspection?',
  'What is checked during a vehicle inspection?',
  'How long does it take to get the inspection report?',
  'Do I need to book an appointment for a vehicle inspection?',
]

export default function ChatWidget({ position = 'right' as 'left' | 'right' }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)

  const { t } = useTranslations()
  const { selectedCountry } = useCountry()

  useEffect(() => {
    // welcome message
    setMessages(prev => prev.length ? prev : [{ from: 'bot', text: t('chat_welcome') }])
  }, [t])

  useEffect(() => {
    // Auto-open once per session (use localStorage to avoid repeated popups)
    try {
      const autoOpened = localStorage.getItem('chat_auto_opened')
      if (!autoOpened) {
        const t = setTimeout(() => {
          setOpen(true)
          localStorage.setItem('chat_auto_opened', '1')
        }, 3000)
        return () => clearTimeout(t)
      }
    } catch (e) {
      // ignore localStorage errors (e.g., SSR or private mode)
      const t = setTimeout(() => setOpen(true), 3000)
      return () => clearTimeout(t)
    }
  }, [])

  const messagesRef = useRef<HTMLDivElement | null>(null)

  const send = async (messageText?: string) => {
    const userMsg = messageText || input.trim()
    if (!userMsg) return

    setMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setInput('')

    const MIN_TYPING_MS = 5000
    const startedAt = Date.now()

    setLoading(true)

    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg, language: selectedCountry?.language || 'en' }) })
      const data = await res.json()

      let replyText: string
      if (data?.success && data.reply) {
        replyText = data.reply
      } else {
        replyText = t('chat_error_generic')
      }

      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, MIN_TYPING_MS - elapsed)

      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: replyText }])
        if (!open) setUnread((u) => u + 1)
        setLoading(false)
        setOpen(true)
      }, remaining)
    } catch (err) {
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, MIN_TYPING_MS - elapsed)
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: t('chat_error_network') }])
        if (!open) setUnread((u) => u + 1)
        setLoading(false)
        setOpen(true)
      }, remaining)
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="w-72 md:w-96 flex flex-col items-end">
        {open && (
          <div className="mb-2 bg-white shadow-xl rounded-xl overflow-hidden border ring-1 ring-black/5 transform transition-all duration-300 origin-bottom-right">
            <div className="flex items-center justify-between p-3 bg-white border-b">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Assistant</div>
                  <div className="text-xs text-gray-500">Get quick help with VINs, plates and reports</div>
                </div>
              </div>
              <button suppressHydrationWarning onClick={() => setOpen(false)} className="p-2 rounded hover:bg-gray-100" aria-label="Close chat"><X className="w-4 h-4 text-gray-600" /></button>
            </div>

            <div ref={messagesRef} className="p-3 max-h-80 overflow-auto space-y-3 bg-white chat-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[80%] px-3 py-2 rounded-lg break-words ${m.from === 'user' ? 'bg-blue-600 text-white ml-auto text-right' : 'bg-gray-100 text-gray-900'}`}>
                  {m.text}
                </div>
              ))}

              {/* Show FAQ questions if no messages yet or just welcome message */}
              {messages.length <= 1 && !loading && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 px-3 py-1">Quick questions:</p>
                  {FAQ_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => send(question)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-sm text-blue-900 transition-colors duration-200 border border-blue-200 hover:border-blue-400"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {loading && (
                <div className="max-w-[60%] px-3 py-2 rounded-lg bg-gray-100 text-gray-900 inline-block">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-700 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-700 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-700 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="text-sm text-gray-600">Assistant is typing…</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t bg-white">
              <div className="flex items-center gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  rows={1}
                  className="flex-1 resize-none rounded-lg border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder={t('chat_input_placeholder')}
                  aria-label={t('chat_input_placeholder')}
                />
                <button suppressHydrationWarning onClick={() => send()} disabled={loading || !input.trim()} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow hover:scale-105 transition-transform" aria-label="Send message">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          suppressHydrationWarning
          onClick={() => { setOpen(o => !o); if (!open) setUnread(0) }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setOpen(o => !o); if (!open) setUnread(0) } }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow flex items-center justify-center hover:scale-110 transition-transform relative ring-0 hover:ring-4 hover:ring-blue-200/50"
          aria-label={open ? 'Close chat' : 'Open chat'}
          title={open ? 'Close chat' : 'Open chat'}
        >
          <MessageSquare className="w-5 h-5" />

          {/* typing badge when closed */}
          {loading && !open && (
            <span className="absolute -top-2 -right-2 bg-white px-1.5 py-0.5 rounded-full shadow flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </span>
          )}

          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow" />
          )}
        </button>
      </div>
    </div>
  )
}
