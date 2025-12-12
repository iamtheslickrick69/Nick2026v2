"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'
import { useCoro } from '@/contexts/CoroContext'
import { useEffect, useState } from 'react'

export function CoroOrb() {
  const { isOpen, toggleChat, messages } = useCoro()
  const [hasUnread, setHasUnread] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)

  // Check for new assistant messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant' && lastMessage.id !== 'welcome') {
        setHasUnread(true)
        setPulseKey(prev => prev + 1)
      }
    } else if (isOpen) {
      setHasUnread(false)
    }
  }, [messages, isOpen])

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={toggleChat}
            className="relative w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open Coro Chat"
          >
            {/* Outer rotating glow */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-75 blur-xl"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #06b6d4, #3b82f6, #14b8a6)',
                backgroundSize: '200% 200%'
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Rotating gradient border */}
            <motion.div
              className="absolute inset-0 rounded-full p-[2px]"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #06b6d4, #3b82f6, #8b5cf6)',
                backgroundSize: '400% 400%'
              }}
              animate={{
                rotate: 360,
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
              }}
            >
              {/* Inner circle with gradient */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 flex items-center justify-center relative overflow-hidden">
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut'
                  }}
                />

                {/* Sparkles icon with pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="relative z-10"
                >
                  <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* Multi-layer pulsing rings */}
            <motion.div
              key={pulseKey}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400/40 to-blue-500/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: hasUnread ? Infinity : 0,
                repeatDelay: 0.3
              }}
            />
            <motion.div
              key={pulseKey + 1}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.3, opacity: 0 }}
              transition={{
                duration: 1.8,
                repeat: hasUnread ? Infinity : 0,
                repeatDelay: 0.3,
                delay: 0.2
              }}
            />

            {/* Notification badge */}
            <AnimatePresence>
              {hasUnread && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-[#202020]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating magic particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 2 === 0 ? '4px' : '3px',
                  height: i % 2 === 0 ? '4px' : '3px',
                  background: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#06b6d4' : '#3b82f6',
                  left: '50%',
                  top: '50%',
                  boxShadow: '0 0 8px currentColor'
                }}
                animate={{
                  x: [0, Math.cos(i * 1.2) * 35],
                  y: [0, Math.sin(i * 1.2) * 35 - 20],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.button>

          {/* Hover tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#202020] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none"
          >
            Chat with Coro
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-[#202020]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
