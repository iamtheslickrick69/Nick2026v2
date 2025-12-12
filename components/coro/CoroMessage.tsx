"use client"

import { motion } from 'framer-motion'
import { CoroMessage as CoroMessageType } from '@/contexts/CoroContext'
import { Sparkles, User, CheckCircle2, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

interface CoroMessageProps {
  message: CoroMessageType
  isLatest: boolean
}

export function CoroMessage({ message, isLatest }: CoroMessageProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex justify-center"
      >
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-3 py-1 rounded-full">
          {message.content}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-gradient-to-br from-[#14b8a6] via-[#06b6d4] to-[#06b6d4]'
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Sparkles className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[75%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white ml-auto'
              : 'bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Metadata for AI messages */}
          {!isUser && message.metadata && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4 text-xs">
              {message.metadata.confidence !== undefined && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  {message.metadata.confidence > 0.8 ? (
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-yellow-500" />
                  )}
                  <span>
                    {Math.round(message.metadata.confidence * 100)}% confident
                  </span>
                </div>
              )}

              {message.metadata.actionable && (
                <div className="flex items-center gap-1 text-[#14b8a6]">
                  <div className="w-2 h-2 rounded-full bg-[#14b8a6]" />
                  <span>Actionable</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-xs text-gray-500 dark:text-gray-400 mt-1 px-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {format(message.timestamp, 'h:mm a')}
        </div>
      </div>
    </motion.div>
  )
}
