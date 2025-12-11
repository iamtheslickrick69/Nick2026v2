"use client"

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function CoroTypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-3"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07850] via-[#1B7F8E] to-[#06b6d4] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Typing animation */}
      <div className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-[#E07850] to-[#1B7F8E]"
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
