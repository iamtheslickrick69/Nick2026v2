"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm Coro, your LoopSync AI assistant. I can help you:\n\n• Analyze feedback patterns\n• Suggest actions for critical issues\n• Answer questions about your team's health\n• Navigate the dashboard\n\nWhat can I help you with today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Generate simple user ID from session (for rate limiting)
      const userId =
        typeof window !== "undefined"
          ? window.sessionStorage.getItem("coroUserId") ||
            (() => {
              const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
              window.sessionStorage.setItem("coroUserId", id)
              return id
            })()
          : "anonymous"

      // Call API with conversation history
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Chat error:", error)

      // Fallback to mock response on error
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(currentInput),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // Pattern matching for demo responses
    if (lowerInput.includes("burnout") || lowerInput.includes("stress")) {
      return "I've detected elevated stress signals in the Engineering team. Based on recent feedback:\n\n📊 **Key Insights:**\n• 3 team members mentioned workload concerns in the past 48 hours\n• Sentiment dropped 12 points this week\n• After-hours messaging sentiment is negative\n\n💡 **Suggested Actions:**\n1. Schedule 1:1s with affected team members\n2. Review Q4 deadline feasibility\n3. Assess resource allocation\n\nWould you like me to create action items for these?"
    }

    if (lowerInput.includes("compensation") || lowerInput.includes("salary") || lowerInput.includes("pay")) {
      return "I found 2 feedback items mentioning compensation concerns:\n\n📌 **Recent Mentions:**\n• Engineering team: 1 concern (high-performer)\n• Sales team: 1 concern\n\n💡 **Recommendation:**\nSchedule a compensation review meeting. Industry benchmarks show your Engineering salaries are 8% below market rate for senior roles.\n\nShould I escalate this to HR?"
    }

    if (lowerInput.includes("risk") || lowerInput.includes("alert")) {
      return "🚨 **Active Risks:**\n\n1. **Retention Risk (72% severity)**\n   • 3 high-performers showing disengagement\n   • Predicted impact: $90K replacement cost\n\n2. **Burnout Risk (68% severity)**\n   • Engineering team elevated stress\n   • Productivity decline risk\n\n3. **Legal/Compliance (45% severity)**\n   • Ongoing concern in Sales team\n\nClick any risk card on the dashboard for detailed analysis."
    }

    if (lowerInput.includes("action") || lowerInput.includes("task")) {
      return "📋 **Action Tracker Summary:**\n\n✅ Completed: 1 action\n⏳ In Progress: 1 action\n⏱️ Pending: 1 action\n\n**Due This Week:** 5 actions\n\nYou can create a new action by clicking the 'New Action' button in the top bar, or I can help you draft one now. What would you like to track?"
    }

    if (lowerInput.includes("culture") || lowerInput.includes("pulse") || lowerInput.includes("score")) {
      return "📈 **Culture Pulse: 68/100**\n\n**Trend:** Down 2 points from last week\n\n**Key Factors:**\n• Employee engagement: Stable\n• Trust in leadership: Slight decline\n• Work-life balance: Concerning drop\n\n**Bright Spots:**\n✨ Marketing team trust score up 23%\n✨ Loop closure rate: 94%\n\nClick the Culture Pulse chart to see the full 30-day trend analysis."
    }

    if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
      return "I can assist you with:\n\n🔍 **Analysis**\n• Identify feedback patterns\n• Predict retention risks\n• Analyze sentiment trends\n\n⚡ **Actions**\n• Suggest responses to critical feedback\n• Create action items\n• Escalate urgent issues\n\n📊 **Insights**\n• Department health summaries\n• Risk assessments\n• Team sentiment analysis\n\n🧭 **Navigation**\n• Find specific feedback\n• Navigate dashboard features\n• Explain metrics\n\nTry asking: 'What risks are active?' or 'Show me burnout signals'"
    }

    if (lowerInput.includes("team") || lowerInput.includes("department")) {
      return "🏢 **Department Health Overview:**\n\n**Engineering:** 72/100 (⚠️ At Risk)\n• High workload concerns\n• Recent sentiment drop\n\n**Sales:** 78/100 (✅ Healthy)\n• Stable performance\n• Minor communication concerns\n\n**Marketing:** 85/100 (✅ Excellent)\n• Trust score rising\n• Engagement up 23%\n\n**Product:** 81/100 (✅ Healthy)\n• Consistent positive feedback\n\nClick any department in the Health Breakdown to filter all feedback by that team."
    }

    // Default response
    return "I'm here to help! I can analyze feedback, suggest actions, and provide insights about your team's health.\n\nTry asking me:\n• 'What are the active risks?'\n• 'Show me burnout signals'\n• 'What's the culture pulse?'\n• 'What actions are due this week?'\n\nOr use Cmd+K to search across all feedback and data."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating LoopSync Orb Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#E07850] via-[#1B7F8E] to-[#06b6d4] animate-pulse shadow-2xl z-50 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-[#E5E5E5] ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E5E5E5] bg-gradient-to-r from-[#E07850] to-[#1B7F8E] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E07850] via-[#1B7F8E] to-[#06b6d4] animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-white">Coro AI</h3>
                  <p className="text-xs text-white/80">Your LoopSync Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] text-white"
                            : "bg-[#F5F3F0] text-[#202020]"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-[#9a9a9a]"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-[#F5F3F0] rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 rounded-full bg-[#666666]"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 rounded-full bg-[#666666]"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 rounded-full bg-[#666666]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[#E5E5E5] bg-[#F5F3F0]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Coro anything..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B7F8E] outline-none text-sm text-[#202020] placeholder:text-[#9a9a9a] bg-white transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                  <p className="text-xs text-[#666666] mt-2 text-center">
                    Press Enter to send • Shift+Enter for new line
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
