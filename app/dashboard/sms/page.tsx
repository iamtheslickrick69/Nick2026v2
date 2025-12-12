"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Phone,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Bot,
  Sparkles,
  Hash,
  Calendar,
  Building,
  Mail,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  Tag,
  Zap
} from "lucide-react"
import { useAuthStore } from "@/lib/auth"

// Enhanced conversation data with full details
const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "employee",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@company.com",
    department: "Engineering",
    avatar: "SJ",
    lastMessage: "The new onboarding process is much smoother now!",
    lastMessageTime: "2 min ago",
    unread: 3,
    status: "active",
    sentiment: "positive",
    priority: "high",
    tags: ["onboarding", "feedback", "positive"],
    satisfaction: 95,
    responseTime: "< 1 min",
    messages: [
      { id: 1, sender: "coro", text: "Hi Sarah! How was your experience with the new onboarding process?", time: "10:30 AM", sentiment: "neutral" },
      { id: 2, sender: "user", text: "It was great! Much better than before", time: "10:32 AM", sentiment: "positive" },
      { id: 3, sender: "coro", text: "That's wonderful to hear! What specifically did you like?", time: "10:32 AM", sentiment: "positive" },
      { id: 4, sender: "user", text: "The new onboarding process is much smoother now!", time: "10:34 AM", sentiment: "positive" },
      { id: 5, sender: "coro", text: "Thank you for the feedback! I'll share this with the team.", time: "10:34 AM", sentiment: "positive" }
    ],
    context: {
      loopStatus: "closing",
      previousInteractions: 3,
      firstContact: "2024-01-15",
      preferredChannel: "sms",
      language: "en"
    }
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "customer",
    phone: "+1 (555) 234-5678",
    email: "mike.chen@email.com",
    avatar: "MC",
    lastMessage: "When will my order arrive?",
    lastMessageTime: "5 min ago",
    unread: 1,
    status: "waiting",
    sentiment: "neutral",
    priority: "medium",
    tags: ["order", "inquiry"],
    satisfaction: 70,
    responseTime: "3 min",
    messages: [
      { id: 1, sender: "user", text: "Hi, I placed an order yesterday", time: "2:15 PM", sentiment: "neutral" },
      { id: 2, sender: "coro", text: "Hello Mike! I can help you track your order. Could you provide your order number?", time: "2:16 PM", sentiment: "neutral" },
      { id: 3, sender: "user", text: "It's #12345", time: "2:17 PM", sentiment: "neutral" },
      { id: 4, sender: "coro", text: "Thank you! I'm checking your order status now...", time: "2:17 PM", sentiment: "neutral" },
      { id: 5, sender: "user", text: "When will my order arrive?", time: "2:20 PM", sentiment: "neutral" }
    ],
    context: {
      customerType: "regular",
      orderHistory: 5,
      lifetimeValue: "$1,250",
      preferredChannel: "sms",
      lastPurchase: "2024-01-20"
    }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    type: "employee",
    phone: "+1 (555) 345-6789",
    email: "emily.r@company.com",
    department: "Marketing",
    avatar: "ER",
    lastMessage: "The break room coffee machine is broken again 😅",
    lastMessageTime: "15 min ago",
    unread: 0,
    status: "resolved",
    sentiment: "neutral",
    priority: "low",
    tags: ["facilities", "maintenance"],
    satisfaction: 85,
    responseTime: "2 min",
    messages: [
      { id: 1, sender: "user", text: "Hey Coro!", time: "1:45 PM", sentiment: "neutral" },
      { id: 2, sender: "coro", text: "Hello Emily! How can I help you today?", time: "1:45 PM", sentiment: "positive" },
      { id: 3, sender: "user", text: "The break room coffee machine is broken again 😅", time: "1:46 PM", sentiment: "neutral" },
      { id: 4, sender: "coro", text: "Oh no! I'll notify facilities right away. This is the third time this month!", time: "1:47 PM", sentiment: "negative" },
      { id: 5, sender: "user", text: "Thanks! You're the best", time: "1:48 PM", sentiment: "positive" },
      { id: 6, sender: "coro", text: "Facilities has been notified and they're on their way! ☕", time: "1:49 PM", sentiment: "positive" }
    ],
    context: {
      loopStatus: "resolved",
      previousInteractions: 12,
      firstContact: "2023-11-01",
      preferredChannel: "sms",
      language: "en"
    }
  },
  {
    id: 4,
    name: "David Park",
    type: "customer",
    phone: "+1 (555) 456-7890",
    email: "david.p@email.com",
    avatar: "DP",
    lastMessage: "This product exceeded my expectations!",
    lastMessageTime: "1 hour ago",
    unread: 0,
    status: "resolved",
    sentiment: "positive",
    priority: "low",
    tags: ["testimonial", "positive", "product"],
    satisfaction: 100,
    responseTime: "1 min",
    messages: [
      { id: 1, sender: "coro", text: "Hi David! We noticed you received your order. How do you like it?", time: "11:00 AM", sentiment: "neutral" },
      { id: 2, sender: "user", text: "This product exceeded my expectations!", time: "11:05 AM", sentiment: "positive" },
      { id: 3, sender: "coro", text: "That's amazing! Would you mind sharing what you loved most about it?", time: "11:06 AM", sentiment: "positive" },
      { id: 4, sender: "user", text: "The quality is outstanding and shipping was super fast", time: "11:08 AM", sentiment: "positive" },
      { id: 5, sender: "coro", text: "Thank you so much! Would you like to leave a review to help others?", time: "11:09 AM", sentiment: "positive" },
      { id: 6, sender: "user", text: "Sure, I'll do that now!", time: "11:10 AM", sentiment: "positive" }
    ],
    context: {
      customerType: "vip",
      orderHistory: 15,
      lifetimeValue: "$5,430",
      preferredChannel: "sms",
      lastPurchase: "2024-01-25"
    }
  },
  {
    id: 5,
    name: "Lisa Anderson",
    type: "employee",
    phone: "+1 (555) 567-8901",
    email: "lisa.a@company.com",
    department: "HR",
    avatar: "LA",
    lastMessage: "Can we discuss the new PTO policy?",
    lastMessageTime: "2 hours ago",
    unread: 2,
    status: "pending",
    sentiment: "neutral",
    priority: "high",
    tags: ["hr", "policy", "pto"],
    satisfaction: 75,
    responseTime: "5 min",
    messages: [
      { id: 1, sender: "user", text: "Hi Coro, I have a question", time: "9:00 AM", sentiment: "neutral" },
      { id: 2, sender: "coro", text: "Of course, Lisa! I'm here to help. What's on your mind?", time: "9:02 AM", sentiment: "positive" },
      { id: 3, sender: "user", text: "Can we discuss the new PTO policy?", time: "9:03 AM", sentiment: "neutral" },
      { id: 4, sender: "coro", text: "I can provide general information, but for detailed policy discussions, I'll connect you with HR leadership.", time: "9:05 AM", sentiment: "neutral" }
    ],
    context: {
      loopStatus: "escalated",
      previousInteractions: 8,
      firstContact: "2023-09-15",
      preferredChannel: "sms",
      language: "en"
    }
  }
]

// Message templates for quick responses
const messageTemplates = [
  { id: 1, title: "Greeting", text: "Hi! How can I help you today?" },
  { id: 2, title: "Order Status", text: "I'll check your order status right away." },
  { id: 3, title: "Feedback Thanks", text: "Thank you for your valuable feedback!" },
  { id: 4, title: "Escalation", text: "I'll connect you with a specialist who can help." },
  { id: 5, title: "Resolution", text: "I'm glad we could resolve this for you!" }
]

export default function SMSCenterPage() {
  const { user } = useAuthStore()
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "employee" | "customer">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "waiting" | "pending" | "resolved">("all")
  const [messageInput, setMessageInput] = useState("")
  const [showTemplates, setShowTemplates] = useState(false)
  const [bulkSelect, setBulkSelect] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || conv.type === filterType
    const matchesStatus = filterStatus === "all" || conv.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  // Stats calculation
  const stats = {
    totalConversations: conversations.length,
    activeConversations: conversations.filter(c => c.status === "active").length,
    avgResponseTime: "2.4 min",
    avgSatisfaction: Math.round(conversations.reduce((acc, c) => acc + c.satisfaction, 0) / conversations.length),
    unreadMessages: conversations.reduce((acc, c) => acc + c.unread, 0)
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In production, would send via API
      console.log("Sending:", messageInput)
      setMessageInput("")
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for:`, bulkSelect)
    setBulkSelect([])
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Panel - Conversations List */}
      <div className="w-96 flex flex-col glass-card">
        {/* Header with Search and Filters */}
        <div className="p-4 border-b border-[#E5E5E5] dark:border-[#202020]">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 py-2 text-sm w-full"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-all ${
                showFilters ? 'bg-[#14b8a6] text-white' : 'hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a]'
              }`}
            >
              <Filter size={16} />
            </button>
          </div>

          {/* Filter Bar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 mb-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="glass-input px-3 py-1 text-xs flex-1"
                  >
                    <option value="all">All Types</option>
                    <option value="employee">Employees</option>
                    <option value="customer">Customers</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="glass-input px-3 py-1 text-xs flex-1"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="waiting">Waiting</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
              <p className="text-xs text-[#666666]">Active</p>
              <p className="text-lg font-bold gradient-text">{stats.activeConversations}</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
              <p className="text-xs text-[#666666]">Unread</p>
              <p className="text-lg font-bold text-orange-500">{stats.unreadMessages}</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
              <p className="text-xs text-[#666666]">Avg Time</p>
              <p className="text-lg font-bold text-[#14b8a6]">{stats.avgResponseTime}</p>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {bulkSelect.length > 0 && (
          <div className="p-3 bg-[#14b8a6]/10 border-b border-[#14b8a6]/20 flex items-center justify-between">
            <span className="text-sm text-[#14b8a6]">{bulkSelect.length} selected</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("archive")}
                className="p-1.5 hover:bg-white/50 rounded-lg transition-all"
              >
                <Archive size={16} />
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="p-1.5 hover:bg-white/50 rounded-lg transition-all text-red-500"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setBulkSelect([])}
                className="p-1.5 hover:bg-white/50 rounded-lg transition-all"
              >
                <XCircle size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConversations.map((conv) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 border-b border-[#E5E5E5] dark:border-[#202020] cursor-pointer transition-all hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] ${
                selectedConversation.id === conv.id ? 'bg-[#F5F3F0] dark:bg-[#1a1a1a]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox for bulk selection */}
                <input
                  type="checkbox"
                  checked={bulkSelect.includes(conv.id)}
                  onChange={(e) => {
                    e.stopPropagation()
                    if (e.target.checked) {
                      setBulkSelect([...bulkSelect, conv.id])
                    } else {
                      setBulkSelect(bulkSelect.filter(id => id !== conv.id))
                    }
                  }}
                  className="mt-3"
                />

                {/* Avatar with status indicator */}
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    conv.type === "employee"
                      ? "bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] text-white"
                      : "bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-white"
                  }`}>
                    {conv.avatar}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    conv.status === 'active' ? 'bg-green-500' :
                    conv.status === 'waiting' ? 'bg-yellow-500' :
                    conv.status === 'pending' ? 'bg-orange-500' :
                    'bg-gray-400'
                  }`}></span>
                </div>

                {/* Conversation Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="font-medium text-sm text-[#202020] dark:text-white">
                        {conv.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          conv.type === "employee"
                            ? "bg-[#14b8a6]/10 text-[#14b8a6]"
                            : "bg-[#3b82f6]/10 text-[#3b82f6]"
                        }`}>
                          {conv.type}
                        </span>
                        {conv.priority === "high" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                            High Priority
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#666666]">{conv.lastMessageTime}</p>
                      {conv.unread > 0 && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#666666] truncate mb-2">
                    {conv.lastMessage}
                  </p>

                  {/* Tags and Sentiment */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {conv.sentiment === 'positive' ? (
                        <TrendingUp size={12} className="text-green-500" />
                      ) : conv.sentiment === 'negative' ? (
                        <TrendingDown size={12} className="text-red-500" />
                      ) : (
                        <ChevronRight size={12} className="text-gray-400" />
                      )}
                      <span className="text-xs text-[#666666]">{conv.satisfaction}%</span>
                    </div>
                    {conv.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-[#F5F3F0] dark:bg-[#202020] text-[#666666]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel - Conversation Detail */}
      <div className="flex-1 flex flex-col glass-card">
        {/* Conversation Header */}
        <div className="p-4 border-b border-[#E5E5E5] dark:border-[#202020]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                selectedConversation.type === "employee"
                  ? "bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] text-white"
                  : "bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-white"
              }`}>
                {selectedConversation.avatar}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#202020] dark:text-white">
                  {selectedConversation.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#666666]">
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {selectedConversation.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> {selectedConversation.email}
                  </span>
                  {selectedConversation.department && (
                    <span className="flex items-center gap-1">
                      <Building size={12} /> {selectedConversation.department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Conversation Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-all">
                <Star size={18} className="text-[#666666]" />
              </button>
              <button className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-all">
                <Archive size={18} className="text-[#666666]" />
              </button>
              <button className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-all">
                <MoreVertical size={18} className="text-[#666666]" />
              </button>
            </div>
          </div>

          {/* Context Bar */}
          <div className="flex items-center gap-4 mt-3 p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
            {selectedConversation.type === "employee" ? (
              <>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#666666]" />
                  <span className="text-xs text-[#666666]">Loop Status:</span>
                  <span className="text-xs font-medium text-[#14b8a6]">
                    {selectedConversation.context.loopStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-[#666666]" />
                  <span className="text-xs text-[#666666]">Interactions:</span>
                  <span className="text-xs font-medium">
                    {selectedConversation.context.previousInteractions}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[#666666]" />
                  <span className="text-xs text-[#666666]">Customer Type:</span>
                  <span className="text-xs font-medium text-[#3b82f6]">
                    {selectedConversation.context.customerType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#666666]" />
                  <span className="text-xs text-[#666666]">LTV:</span>
                  <span className="text-xs font-medium">
                    {selectedConversation.context.lifetimeValue}
                  </span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#666666]" />
              <span className="text-xs text-[#666666]">First Contact:</span>
              <span className="text-xs font-medium">
                {selectedConversation.context.firstContact || selectedConversation.context.lastPurchase}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-4">
            {selectedConversation.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.sender === 'coro' && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                        <Bot size={12} className="text-white" />
                      </div>
                      <span className="text-xs text-[#666666]">Coro AI</span>
                      {message.sentiment === 'positive' && (
                        <Sparkles size={12} className="text-[#14b8a6]" />
                      )}
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white'
                      : 'glass-card'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-[#666666] mt-1 px-2">
                    {message.time}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* AI Suggestion */}
            {selectedConversation.status === 'waiting' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
              >
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      AI Suggestion
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Customer is waiting for order status. Consider providing tracking information or expected delivery date.
                    </p>
                    <button className="mt-2 px-3 py-1 text-xs bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all">
                      Use Suggested Response
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-t border-[#E5E5E5] dark:border-[#202020]">
          {/* Quick Templates */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-3 py-1 text-xs rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a] hover:bg-[#ECEAE6] dark:hover:bg-[#202020] transition-all"
            >
              Quick Templates
            </button>
            {showTemplates && messageTemplates.slice(0, 3).map((template) => (
              <button
                key={template.id}
                onClick={() => setMessageInput(template.text)}
                className="px-3 py-1 text-xs rounded-lg border border-[#E5E5E5] dark:border-[#202020] hover:border-[#14b8a6] transition-all"
              >
                {template.title}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Type a message..."
                className="glass-input w-full resize-none"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="p-3 glass-button-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>

          {/* Character count and status */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#666666]">
              {messageInput.length}/500 characters
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666666]">Response time: {selectedConversation.responseTime}</span>
              <span className={`w-2 h-2 rounded-full ${
                selectedConversation.status === 'active' ? 'bg-green-500 pulse-live' : 'bg-gray-400'
              }`}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Insights */}
      <div className="w-80 glass-card p-4">
        <h3 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">
          Conversation Insights
        </h3>

        {/* Sentiment Analysis */}
        <div className="mb-4 p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
          <h4 className="text-xs font-medium text-[#666666] mb-2">Sentiment Trend</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedConversation.sentiment === 'positive' ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : selectedConversation.sentiment === 'negative' ? (
                <XCircle size={20} className="text-red-500" />
              ) : (
                <AlertCircle size={20} className="text-yellow-500" />
              )}
              <span className="text-sm font-medium capitalize">
                {selectedConversation.sentiment}
              </span>
            </div>
            <span className="text-lg font-bold gradient-text">
              {selectedConversation.satisfaction}%
            </span>
          </div>
        </div>

        {/* Key Topics */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-[#666666] mb-2">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {selectedConversation.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-[#14b8a6]/10 to-[#06b6d4]/10 text-[#14b8a6]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-[#666666] mb-2">Suggested Actions</h4>
          <div className="space-y-2">
            {selectedConversation.status === 'waiting' && (
              <button className="w-full text-left p-2 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a] hover:bg-[#ECEAE6] dark:hover:bg-[#202020] transition-all">
                <p className="text-xs font-medium">Follow up on inquiry</p>
                <p className="text-xs text-[#666666]">Customer waiting for response</p>
              </button>
            )}
            {selectedConversation.sentiment === 'positive' && (
              <button className="w-full text-left p-2 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a] hover:bg-[#ECEAE6] dark:hover:bg-[#202020] transition-all">
                <p className="text-xs font-medium">Request testimonial</p>
                <p className="text-xs text-[#666666]">High satisfaction score</p>
              </button>
            )}
            {selectedConversation.type === 'employee' && selectedConversation.context.loopStatus === 'closing' && (
              <button className="w-full text-left p-2 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a] hover:bg-[#ECEAE6] dark:hover:bg-[#202020] transition-all">
                <p className="text-xs font-medium">Close feedback loop</p>
                <p className="text-xs text-[#666666]">Mark as resolved</p>
              </button>
            )}
          </div>
        </div>

        {/* Communication History */}
        <div>
          <h4 className="text-xs font-medium text-[#666666] mb-2">History</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#666666]">Total Interactions</span>
              <span className="font-medium">
                {selectedConversation.context.previousInteractions || selectedConversation.context.orderHistory}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#666666]">Avg Response Time</span>
              <span className="font-medium">{selectedConversation.responseTime}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#666666]">Preferred Channel</span>
              <span className="font-medium uppercase">
                {selectedConversation.context.preferredChannel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}