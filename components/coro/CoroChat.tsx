"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Trash2, Send, Sparkles } from 'lucide-react'
import { useCoro } from '@/contexts/CoroContext'
import { useState, useRef, useEffect } from 'react'
import { CoroMessage } from './CoroMessage'
import { CoroTypingIndicator } from './CoroTypingIndicator'
import { Button } from '@/components/ui/button'

export function CoroChat() {
  const { isOpen, closeChat, messages, sendMessage, clearHistory, isTyping, isLoading } = useCoro()
  const [input, setInput] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input
    setInput('')
    await sendMessage(message)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your chat history with Coro?')) {
      clearHistory()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            height: isMinimized ? 60 : 600
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 w-[420px] bg-white dark:bg-[#202020] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#E07850] via-[#1B7F8E] to-[#06b6d4] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255, 255, 255, 0.4)',
                    '0 0 0 8px rgba(255, 255, 255, 0)',
                    '0 0 0 0 rgba(255, 255, 255, 0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-white font-semibold text-lg">Coro</h3>
                <p className="text-white/80 text-xs">AI Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearHistory}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeChat}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#1a1a1a]">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <CoroMessage
                      key={message.id}
                      message={message}
                      isLatest={index === messages.length - 1}
                    />
                  ))}
                </AnimatePresence>

                {isTyping && <CoroTypingIndicator />}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202020]">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Coro anything..."
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E07850] resize-none"
                      rows={1}
                      style={{
                        minHeight: '48px',
                        maxHeight: '120px'
                      }}
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#E07850] to-[#1B7F8E] hover:opacity-90 disabled:opacity-50 h-8 w-8"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
