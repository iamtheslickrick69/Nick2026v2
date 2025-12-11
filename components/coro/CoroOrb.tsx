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
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#E07850] via-[#1B7F8E] to-[#06b6d4] shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-[#E07850]/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open Coro Chat"
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E07850] via-[#1B7F8E] to-[#06b6d4]"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Inner circle */}
            <div className="absolute inset-[3px] rounded-full bg-white dark:bg-[#202020] flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Sparkles className="w-7 h-7 text-[#E07850]" />
              </motion.div>
            </div>

            {/* Pulsing ring effect */}
            <motion.div
              key={pulseKey}
              className="absolute inset-0 rounded-full bg-[#E07850]/30"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: hasUnread ? Infinity : 0,
                repeatDelay: 0.5
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

            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#06b6d4] rounded-full"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: [0, (i - 1) * 20],
                  y: [0, -30 - i * 10],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
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
