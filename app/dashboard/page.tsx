"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuthStore } from "@/lib/auth"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Phone,
  ArrowRight,
  Send,
  ChevronRight,
  RefreshCw,
  Zap,
  Activity
} from "lucide-react"

// Demo data for SMS conversations
const demoConversations = [
  {
    id: '1',
    phone: '+1234567890',
    name: 'Anonymous Employee',
    department: 'Engineering',
    lastMessage: 'The deployment process is really stressful. We need better documentation.',
    timestamp: '2 min ago',
    unread: true,
    sentiment: 'negative',
    type: 'employee'
  },
  {
    id: '2',
    phone: '+0987654321',
    name: 'Customer #4521',
    lastMessage: 'Your product saved us hours of work! Thank you!',
    timestamp: '5 min ago',
    unread: false,
    sentiment: 'positive',
    type: 'customer'
  },
  {
    id: '3',
    phone: '+1122334455',
    name: 'Anonymous Employee',
    department: 'Sales',
    lastMessage: 'Commission structure needs review. Team morale is dropping.',
    timestamp: '12 min ago',
    unread: true,
    sentiment: 'negative',
    type: 'employee'
  }
]

// Demo loop stages
const loopStages = {
  new: [
    { id: '1', title: 'Deployment stress', department: 'Engineering', age: '2 min', priority: 'high' },
    { id: '3', title: 'Commission concerns', department: 'Sales', age: '12 min', priority: 'high' }
  ],
  acknowledged: [
    { id: '4', title: 'Remote work policy', department: 'HR', age: '1 hour', priority: 'medium', assignee: 'Marcus J.' }
  ],
  inProgress: [
    { id: '5', title: 'Tool access issues', department: 'IT', age: '3 hours', priority: 'medium', assignee: 'Sarah C.' },
    { id: '6', title: 'Training needs', department: 'Product', age: '1 day', priority: 'low', assignee: 'Emily R.' }
  ],
  resolved: [
    { id: '7', title: 'Parking concerns', department: 'Facilities', age: '2 days', priority: 'low', resolution: 'Added 20 spots' },
    { id: '8', title: 'Coffee quality', department: 'Office', age: '3 days', priority: 'low', resolution: 'New supplier' }
  ]
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [mode, setMode] = useState<'employee' | 'customer'>('employee')
  const [refreshing, setRefreshing] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true)
      setTimeout(() => setRefreshing(false), 500)
    }, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const stats = {
    activeLoops: mode === 'employee' ? 12 : 8,
    avgResponseTime: mode === 'employee' ? '2.4 hrs' : '1.2 hrs',
    satisfaction: mode === 'employee' ? '78%' : '92%',
    participation: mode === 'employee' ? '67%' : '45%'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#202020] dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-[#666666] dark:text-[#999999] mt-1">
            Here's what's happening with your {mode === 'employee' ? 'team' : 'customers'} today
          </p>
        </div>
        <button
          onClick={() => setRefreshing(true)}
          className={`glass-button flex items-center gap-2 ${refreshing ? 'opacity-50' : ''}`}
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-[#14b8a6]" />
            <span className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{stats.activeLoops}</p>
          <p className="text-sm text-[#666666] dark:text-[#999999]">Active Loops</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-[#06b6d4]" />
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{stats.avgResponseTime}</p>
          <p className="text-sm text-[#666666] dark:text-[#999999]">Avg Response</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{stats.satisfaction}</p>
          <p className="text-sm text-[#666666] dark:text-[#999999]">Satisfaction</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-[#8b5cf6]" />
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{stats.participation}</p>
          <p className="text-sm text-[#666666] dark:text-[#999999]">Participation</p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SMS Conversations (Left) */}
        <div className="lg:col-span-1 glass-card p-0 overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5] dark:border-[#202020]">
            <h2 className="font-semibold text-[#202020] dark:text-white flex items-center gap-2">
              <MessageSquare size={18} />
              Live Conversations
              <span className="ml-auto text-xs text-[#666666] dark:text-[#999999]">
                {demoConversations.filter(c => c.unread).length} unread
              </span>
            </h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            {demoConversations.map((conversation) => (
              <motion.button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 text-left border-b border-[#E5E5E5] dark:border-[#202020] hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-[#F5F3F0] dark:bg-[#1a1a1a]' : ''
                }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    conversation.type === 'employee'
                      ? 'bg-gradient-to-br from-[#14b8a6] to-[#06b6d4]'
                      : 'bg-gradient-to-br from-[#06b6d4] to-[#3b82f6]'
                  }`}>
                    {conversation.type === 'employee' ? <Users size={16} className="text-white" /> : <Phone size={16} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-[#202020] dark:text-white truncate">
                        {conversation.name}
                      </p>
                      <span className="text-xs text-[#666666] dark:text-[#999999]">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-[#666666] dark:text-[#999999] truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread && (
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Loop Closure Pipeline (Right - 2 cols) */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#202020] dark:text-white flex items-center gap-2">
              <UserCheck size={18} />
              Loop Closure Pipeline
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666666] dark:text-[#999999]">Auto-assign</span>
              <button className="relative">
                <div className="w-10 h-5 bg-[#E5E5E5] dark:bg-[#202020] rounded-full"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-[#14b8a6] rounded-full transform translate-x-5"></div>
              </button>
            </div>
          </div>

          {/* Pipeline Stages */}
          <div className="grid grid-cols-4 gap-4">
            {/* New */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#202020] dark:text-white">New</h3>
                <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 px-2 py-1 rounded-full">
                  {loopStages.new.length}
                </span>
              </div>
              <div className="space-y-2">
                {loopStages.new.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-[#E5E5E5] dark:border-[#202020] cursor-move hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    draggable
                  >
                    <p className="text-xs font-medium text-[#202020] dark:text-white mb-1">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#666666] dark:text-[#999999]">{item.department}</span>
                      <span className={`text-xs ${item.priority === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                        {item.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Acknowledged */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#202020] dark:text-white">Acknowledged</h3>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-600 px-2 py-1 rounded-full">
                  {loopStages.acknowledged.length}
                </span>
              </div>
              <div className="space-y-2">
                {loopStages.acknowledged.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-[#E5E5E5] dark:border-[#202020] cursor-move hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    draggable
                  >
                    <p className="text-xs font-medium text-[#202020] dark:text-white mb-1">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#666666] dark:text-[#999999]">{item.assignee}</span>
                      <span className="text-xs text-amber-600">{item.age}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#202020] dark:text-white">In Progress</h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 px-2 py-1 rounded-full">
                  {loopStages.inProgress.length}
                </span>
              </div>
              <div className="space-y-2">
                {loopStages.inProgress.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-[#E5E5E5] dark:border-[#202020] cursor-move hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    draggable
                  >
                    <p className="text-xs font-medium text-[#202020] dark:text-white mb-1">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#666666] dark:text-[#999999]">{item.assignee}</span>
                      <span className="text-xs text-blue-600">{item.age}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resolved */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#202020] dark:text-white">Resolved</h3>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 px-2 py-1 rounded-full">
                  {loopStages.resolved.length}
                </span>
              </div>
              <div className="space-y-2">
                {loopStages.resolved.map((item) => (
                  <motion.div
                    key={item.id}
                    className="p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-emerald-200 dark:border-emerald-900 cursor-move hover:shadow-md transition-all opacity-75"
                    whileHover={{ scale: 1.02 }}
                    draggable
                  >
                    <p className="text-xs font-medium text-[#202020] dark:text-white mb-1 line-through">{item.title}</p>
                    <p className="text-xs text-emerald-600 truncate">{item.resolution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-[#E5E5E5] dark:border-[#202020]">
            <div className="flex items-center gap-3">
              <button className="glass-button-primary flex items-center gap-2">
                <Zap size={16} />
                Auto-Assign All
              </button>
              <button className="glass-button flex items-center gap-2">
                <CheckCircle size={16} />
                Mark Resolved
              </button>
              <button className="glass-button flex items-center gap-2">
                <AlertTriangle size={16} />
                View Urgent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Detail Modal */}
      <AnimatePresence>
        {selectedConversation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedConversation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#202020] dark:text-white">
                  Conversation with {selectedConversation.name}
                </h3>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="h-[400px] overflow-y-auto custom-scrollbar bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-xl p-4 mb-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm bg-white dark:bg-[#0a0a0a] rounded-xl p-3">
                        Hi! I'm Coro. What's on your mind today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1">
                      <p className="text-sm bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white rounded-xl p-3">
                        {selectedConversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a response..."
                  className="glass-input flex-1"
                />
                <button className="glass-button-primary p-3">
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}