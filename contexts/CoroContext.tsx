"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface CoroMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    confidence?: number
    sources?: string[]
    actionable?: boolean
  }
}

interface CoroContextType {
  isOpen: boolean
  messages: CoroMessage[]
  isTyping: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearHistory: () => void
  isLoading: boolean
}

const CoroContext = createContext<CoroContextType | undefined>(undefined)

export function CoroProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<CoroMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('coro-chat-history')
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    } else {
      // Add welcome message if no history
      const welcomeMessage: CoroMessage = {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Coro, your AI assistant for LoopSync. I'm here to help you understand employee feedback, track actions, analyze culture health, and provide insights. How can I help you today?",
        timestamp: new Date(),
        metadata: {
          confidence: 1.0
        }
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('coro-chat-history', JSON.stringify(messages))
    }
  }, [messages])

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const toggleChat = useCallback(() => setIsOpen(prev => !prev), [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: CoroMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setIsLoading(true)

    try {
      // Call API to get AI response
      const response = await fetch('/api/coro/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Coro')
      }

      const data = await response.json()

      // Add AI response
      const aiMessage: CoroMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        metadata: data.metadata
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)

      // Add error message
      const errorMessage: CoroMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again in a moment.",
        timestamp: new Date(),
        metadata: {
          confidence: 0
        }
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsLoading(false)
    }
  }, [messages])

  const clearHistory = useCallback(() => {
    const welcomeMessage: CoroMessage = {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm Coro, your AI assistant for LoopSync. I'm here to help you understand employee feedback, track actions, analyze culture health, and provide insights. How can I help you today?",
      timestamp: new Date(),
      metadata: {
        confidence: 1.0
      }
    }
    setMessages([welcomeMessage])
    localStorage.removeItem('coro-chat-history')
  }, [])

  const value: CoroContextType = {
    isOpen,
    messages,
    isTyping,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearHistory,
    isLoading
  }

  return <CoroContext.Provider value={value}>{children}</CoroContext.Provider>
}

export function useCoro() {
  const context = useContext(CoroContext)
  if (context === undefined) {
    throw new Error('useCoro must be used within a CoroProvider')
  }
  return context
}
