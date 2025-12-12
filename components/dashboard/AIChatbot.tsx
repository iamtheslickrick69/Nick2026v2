"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, Minimize2, Maximize2, Users, Briefcase, MessageCircle, HelpCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type TabType = "employee" | "executive" | "customer" | "qa"

interface TabConfig {
  id: TabType
  label: string
  icon: any
  welcome: string
  prompts: string[]
  persona: string
}

const tabConfigs: TabConfig[] = [
  {
    id: "employee",
    label: "Employee",
    icon: Users,
    welcome: "👋 Hi! I'm Coro. You can share any feedback anonymously here—no names, no judgment. What's on your mind?",
    prompts: ["I'm feeling burned out", "Team morale is low", "Great collaboration lately", "Concerns about my manager"],
    persona: "empathetic listener focused on employee wellbeing and anonymity"
  },
  {
    id: "executive",
    label: "Executive",
    icon: Briefcase,
    welcome: "👋 Hi! I'm Coro, your strategic insights partner. I can provide executive summaries, risk analysis, and actionable recommendations. What would you like to explore?",
    prompts: ["Show me top risks", "Department health overview", "Culture pulse trends", "Action items summary"],
    persona: "strategic advisor providing data-driven insights for leadership"
  },
  {
    id: "customer",
    label: "Customer",
    icon: MessageCircle,
    welcome: "👋 Hi! I'm Coro, here to capture your product feedback and support needs. Your voice helps shape what we build next. How can I help?",
    prompts: ["Feature request", "Report a bug", "Product feedback", "Service experience"],
    persona: "customer support agent focused on product feedback and service quality"
  },
  {
    id: "qa",
    label: "Q&A",
    icon: HelpCircle,
    welcome: "👋 Hi! I'm Coro, your LoopSync product expert. I can answer questions about how LoopSync works, pricing, features, and best practices. What would you like to know?",
    prompts: ["How does anonymity work?", "Pricing information", "Integration options", "Best practices"],
    persona: "product expert explaining LoopSync features and capabilities"
  }
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("employee")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: tabConfigs[0].welcome,
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

  // Reset messages when tab changes
  useEffect(() => {
    const config = tabConfigs.find(t => t.id === activeTab)
    if (config) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: config.welcome,
        timestamp: new Date(),
      }])
    }
  }, [activeTab])

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

    // EMPLOYEE TAB RESPONSES
    if (activeTab === "employee") {
      if (lowerInput.includes("burnout") || lowerInput.includes("stress") || lowerInput.includes("burned out")) {
        return "I'm really sorry you're feeling this way. Burnout is serious, and I'm glad you're speaking up.\n\n💚 **What I'm hearing:**\nYou're feeling overwhelmed and exhausted. That's completely valid.\n\n🛡️ **Your feedback is anonymous** - your manager won't know this came from you unless you choose to identify yourself.\n\n✨ **What happens next:**\n• Your concern is logged confidentially\n• HR will see burnout trends (not individual names)\n• Leadership will receive aggregate data to improve workload\n\nWould you like to share more details about what's contributing to this feeling?"
      }

      if (lowerInput.includes("manager") || lowerInput.includes("boss")) {
        return "Thank you for trusting me with this. Concerns about managers are taken very seriously here.\n\n🔒 **Your anonymity is protected** - your manager will NOT see this feedback tied to your name.\n\n📊 **What happens:**\n• Your feedback helps identify patterns\n• If multiple people report similar concerns, HR investigates\n• All feedback is aggregated for leadership review\n\nIf you'd like to share more specifics, I'm here to listen. Everything you say is confidential."
      }

      if (lowerInput.includes("morale") || lowerInput.includes("team") || lowerInput.includes("collaboration")) {
        return "Thanks for sharing your thoughts about team dynamics. This kind of feedback is incredibly valuable.\n\n✨ Whether it's positive or negative, team morale insights help leadership understand what's working and what needs attention.\n\n💭 **Feel free to share:**\n• What's going well on your team?\n• What could be improved?\n• Any specific incidents or patterns?\n\nRemember: this is completely anonymous. You're safe to speak openly here."
      }

      // Default employee response
      return "I'm here to listen. Whatever you're experiencing—good or bad—your voice matters.\n\n🛡️ **This space is:**\n• 100% anonymous\n• Judgment-free\n• Confidential\n\nYou can share concerns about workload, management, team dynamics, compensation, or anything else on your mind.\n\nWhat would you like to talk about?"
    }

    // EXECUTIVE TAB RESPONSES
    if (activeTab === "executive") {
      if (lowerInput.includes("risk") || lowerInput.includes("alert")) {
        return "🚨 **Active Risk Summary:**\n\n1. **Retention Risk (72% severity)**\n   • 3 high-performers showing disengagement\n   • Predicted impact: $90K replacement cost\n   • Recommendation: Schedule stay interviews\n\n2. **Burnout Risk (68% severity)**\n   • Engineering team elevated stress\n   • 40% increase in workload complaints\n   • Recommendation: Review Q4 deadlines\n\n3. **Legal/Compliance (45% severity)**\n   • Pattern in Sales team feedback\n   • Recommendation: Escalate to HR investigation\n\n**Next Steps:** Click 'Risk Radar' in the sidebar for detailed analysis and action plans."
      }

      if (lowerInput.includes("department") || lowerInput.includes("health") || lowerInput.includes("team")) {
        return "🏢 **Department Health Overview:**\n\n**Engineering:** 72/100 (⚠️ At Risk)\n• High workload concerns (40% increase)\n• Sentiment down 12 points\n• PTO usage below average\n\n**Sales:** 78/100 (✅ Healthy)\n• Stable performance\n• Minor communication gaps identified\n\n**Marketing:** 85/100 (✅ Excellent)\n• Trust score up 23% post-leadership changes\n• Loop closure: 94%\n\n**Product:** 81/100 (✅ Healthy)\n• Consistent positive feedback\n• Strong cross-functional collaboration\n\n**Recommendation:** Focus intervention on Engineering team burnout."
      }

      if (lowerInput.includes("culture") || lowerInput.includes("pulse") || lowerInput.includes("trends")) {
        return "📈 **Culture Pulse: 68/100**\n\n**30-Day Trend:** ↓ Down 2 points\n\n**Key Insights:**\n• **Work-Life Balance:** Declining (⚠️ action needed)\n• **Leadership Trust:** Slight dip in Engineering\n• **Engagement:** Stable overall\n• **Communication:** Improvement opportunities\n\n**Bright Spots:**\n✨ Marketing team trust +23%\n✨ Loop closure rate: 94%\n\n**Strategic Recommendation:**\nAddress Engineering workload immediately to prevent culture decline from spreading to other departments."
      }

      if (lowerInput.includes("action") || lowerInput.includes("items")) {
        return "📋 **Action Tracker Overview:**\n\n**Status:**\n✅ Completed: 1 (33%)\n⏳ In Progress: 1 (33%)\n⏱️ Pending: 1 (33%)\n\n**Due This Week:** 5 actions\n**Overdue:** 0 actions\n\n**Top Priority:**\n• Burnout feedback acknowledged (Completed)\n• 1:1 with Engineering team (In Progress)\n• Compensation review (Pending)\n\n**Completion Rate:** 87% (past 90 days)\n\nNavigate to 'Action Tracker' for full details and to assign new actions."
      }

      // Default executive response
      return "I'm your strategic insights partner. I can provide:\n\n📊 **Analytics**\n• Department health summaries\n• Risk assessments with predicted impact\n• Culture pulse trends\n\n🎯 **Actionable Intelligence**\n• Priority recommendations\n• Early warning signals\n• ROI analysis on interventions\n\nTry asking:\n• 'Show me top risks'\n• 'Department health overview'\n• 'Culture pulse trends'"
    }

    // CUSTOMER TAB RESPONSES
    if (activeTab === "customer") {
      if (lowerInput.includes("feature") || lowerInput.includes("request")) {
        return "Thanks for your feature request! Product feedback like this directly shapes our roadmap.\n\n📝 **Next Steps:**\n1. Your request is logged with the Product team\n2. Similar requests are aggregated to identify demand\n3. You'll be notified if we prioritize this feature\n\n💡 **Can you share more about:**\n• What problem would this solve for you?\n• How often would you use this feature?\n• Are there workarounds you're using today?\n\nYour input helps us build what matters most to customers like you."
      }

      if (lowerInput.includes("bug") || lowerInput.includes("issue") || lowerInput.includes("broken")) {
        return "I'm sorry you're experiencing issues. Let's get this to the right team immediately.\n\n🔧 **Bug Report Details:**\n\nTo help our engineering team fix this quickly, could you share:\n• What were you trying to do?\n• What actually happened?\n• Any error messages you saw?\n• Browser/device info?\n\n🚨 **Priority:** This will be escalated to Engineering with high priority.\n\nThank you for helping us improve the product!"
      }

      if (lowerInput.includes("feedback") || lowerInput.includes("experience")) {
        return "We really appreciate you taking the time to share feedback.\n\n⭐ **Your voice matters** - customer insights directly influence:\n• Product roadmap priorities\n• UX improvements\n• Feature enhancements\n\n💭 **I'd love to hear more about:**\n• What's working well for you?\n• What could be better?\n• Any pain points in your workflow?\n\nAll feedback is reviewed by our Product and Customer Success teams."
      }

      if (lowerInput.includes("service") || lowerInput.includes("support")) {
        return "Thank you for sharing your service experience.\n\n💼 **Customer Success Review:**\nYour feedback about our support team helps us maintain high service standards.\n\n📊 **What happens next:**\n• Your feedback is shared with the Customer Success team\n• We identify training opportunities\n• Service quality metrics are updated\n\n🌟 **Tell me more:**\n• Who helped you? (if you'd like to recognize them)\n• What went well or could improve?\n• How urgent was your issue?\n\nWe're committed to exceptional service."
      }

      // Default customer response
      return "👋 Thanks for reaching out! I'm here to capture your product feedback and support experiences.\n\n💬 **I can help with:**\n• Feature requests\n• Bug reports\n• Product feedback\n• Service experience\n\n✨ **Your input shapes what we build next.**\n\nWhat would you like to share today?"
    }

    // Q&A TAB RESPONSES
    if (activeTab === "qa") {
      if (lowerInput.includes("anonymous") || lowerInput.includes("anonymity") || lowerInput.includes("privacy")) {
        return "🔒 **How LoopSync Anonymity Works:**\n\n**Technical Protection:**\n• Zero personal identifiers stored with feedback\n• No email/name/IP tracking\n• SMS-based = inherently private\n• End-to-end encryption\n\n**What Managers See:**\n• Aggregate trends only\n• Department-level patterns\n• No individual attribution\n\n**What HR Sees:**\n• Anonymized feedback content\n• Metadata for patterns (e.g., 'Sales team')\n• No way to trace back to individuals\n\n**Exception:** If an employee voluntarily identifies themselves in their message.\n\n✅ **Bottom line:** True anonymity, not just 'optional anonymity.'"
      }

      if (lowerInput.includes("price") || lowerInput.includes("pricing") || lowerInput.includes("cost")) {
        return "💰 **LoopSync Pricing:**\n\n**Plans:**\n• **Starter:** $499/month (up to 50 employees)\n• **Growth:** $999/month (up to 200 employees)\n• **Enterprise:** Custom pricing (200+ employees)\n\n**What's Included:**\n✅ Unlimited SMS conversations with Coro\n✅ AI-powered risk detection\n✅ Real-time dashboard & analytics\n✅ Action tracker & loop closure\n✅ Enterprise-grade security\n✅ Dedicated success manager (Growth+)\n\n**ROI:** Average clients prevent 1-2 costly departures per year, paying for LoopSync 3-5x over.\n\nInterested in a demo? Let me know!"
      }

      if (lowerInput.includes("integration") || lowerInput.includes("integrate") || lowerInput.includes("connect")) {
        return "🔌 **LoopSync Integrations:**\n\n**HRIS Systems:**\n✅ BambooHR\n✅ Workday\n✅ ADP\n✅ Rippling\n✅ Gusto\n\n**Communication:**\n✅ Slack (alerts & notifications)\n✅ Microsoft Teams\n✅ Email notifications\n\n**Ticketing:**\n✅ Jira (action item sync)\n✅ Asana\n✅ Linear\n\n**How It Works:**\n• Auto-sync employee roster\n• Push action items to your PM tool\n• Real-time Slack alerts for urgent feedback\n• SSO (SAML, OAuth)\n\n**API Access:** Enterprise plan includes REST API for custom integrations.\n\nNeed a specific integration? Let us know!"
      }

      if (lowerInput.includes("best practice") || lowerInput.includes("how to use") || lowerInput.includes("tips")) {
        return "✨ **LoopSync Best Practices:**\n\n**1. Launch Communication (Critical)**\n• Emphasize anonymity & safety\n• Leadership buy-in message\n• Clear 'why' for employees\n\n**2. Manager Training**\n• Teach non-defensive feedback response\n• Set loop closure expectations (48hr response)\n• Aggregate data review (not individual hunting)\n\n**3. Consistent Monitoring**\n• Check dashboard 2-3x/week minimum\n• Respond to all feedback within 48 hours\n• Take action on patterns, not one-offs\n\n**4. Close the Loop**\n• Share what actions you took based on feedback\n• Employees see their voice = impact\n• Trust compounds over time\n\n**5. Executive Reviews**\n• Monthly culture pulse reviews\n• Quarterly risk assessments\n• Track intervention ROI\n\n📚 Want our full implementation playbook? I can send it over!"
      }

      if (lowerInput.includes("how") || lowerInput.includes("work") || lowerInput.includes("works")) {
        return "🤖 **How LoopSync Works:**\n\n**For Employees:**\n1. Receive SMS from Coro (your AI assistant)\n2. Reply anonymously with any feedback\n3. Have ongoing conversations\n4. See leadership take action based on aggregated insights\n\n**For Leadership:**\n1. Dashboard shows real-time feedback & sentiment\n2. AI identifies patterns, risks, and trends\n3. Action tracker helps you respond & close loops\n4. Analytics prove ROI and culture health\n\n**The Magic:**\n• SMS = 98% open rate (vs 20% for email)\n• AI (Coro) makes it feel conversational, not corporate\n• Anonymity = honest feedback\n• Loop closure = employees trust the system\n\n**Result:** Early warning system that prevents costly turnover and builds trust.\n\nAny specific part you'd like to dive deeper on?"
      }

      // Default Q&A response
      return "👋 I'm your LoopSync product expert. I can answer questions about:\n\n🔒 **Privacy & Security**\n• How anonymity works\n• Data protection\n• Compliance (SOC 2, GDPR)\n\n💰 **Pricing & Plans**\n• Subscription tiers\n• ROI examples\n• Custom enterprise options\n\n🔌 **Integrations**\n• HRIS connections\n• Slack/Teams alerts\n• API access\n\n📚 **Best Practices**\n• Launch strategies\n• Manager training\n• Maximizing engagement\n\nWhat would you like to know?"
    }

    // Fallback (shouldn't hit this, but just in case)
    return "I'm here to help! What would you like to know?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Coro Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] shadow-lg hover:shadow-xl transition-shadow z-50 cursor-pointer flex items-center justify-center"
          >
            <Sparkles size={28} className="text-white" />
          </motion.button>
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
            <div className="p-4 border-b border-[#E5E5E5] bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Sparkles Icon */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={20} className="text-white" />
                </div>
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

            {/* Tabs */}
            {!isMinimized && (
              <div className="flex border-b border-[#E5E5E5] bg-[#F5F3F0]">
                {tabConfigs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-all relative ${
                        isActive
                          ? "text-[#14b8a6] bg-white"
                          : "text-[#666666] hover:text-[#202020] hover:bg-white/50"
                      }`}
                    >
                      <Icon size={14} />
                      <span>{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14b8a6]"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div key={message.id}>
                      <motion.div
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

                      {/* Show suggested prompts after the welcome message */}
                      {message.id === "welcome" && index === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-3 flex flex-wrap gap-2"
                        >
                          {tabConfigs.find(t => t.id === activeTab)?.prompts.map((prompt, idx) => (
                            <button
                              key={idx}
                              onClick={() => setInputValue(prompt)}
                              className="text-xs px-3 py-2 rounded-lg bg-white border border-[#E5E5E5] text-[#666666] hover:text-[#202020] hover:border-[#14b8a6]/30 hover:bg-[#F5F3F0] transition-all"
                            >
                              {prompt}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
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
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#14b8a6] outline-none text-sm text-[#202020] placeholder:text-[#9a9a9a] bg-white transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
