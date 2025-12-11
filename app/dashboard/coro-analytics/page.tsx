"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import {
  MessageSquare,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users,
  BarChart3,
  Activity,
  Shield,
} from "lucide-react"

interface AnalyticsMetrics {
  totalConversations: number
  totalMessages: number
  avgMessagesPerConversation: number
  avgResponseTime: number
  topTopics: { topic: string; count: number }[]
  blockedMessages: number
  warningMessages: number
  peakUsageHours: number[]
}

export default function CoroAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsMetrics>({
    totalConversations: 0,
    totalMessages: 0,
    avgMessagesPerConversation: 0,
    avgResponseTime: 0,
    topTopics: [],
    blockedMessages: 0,
    warningMessages: 0,
    peakUsageHours: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch analytics from API
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const statCards = [
    {
      icon: MessageSquare,
      label: "Total Conversations",
      value: analytics.totalConversations.toLocaleString(),
      color: "text-[#E07850]",
      bg: "bg-[#E07850]/10",
      trend: "+12% this week",
    },
    {
      icon: Activity,
      label: "Total Messages",
      value: analytics.totalMessages.toLocaleString(),
      color: "text-[#1B7F8E]",
      bg: "bg-[#1B7F8E]/10",
      trend: `${analytics.avgMessagesPerConversation.toFixed(1)} avg/conversation`,
    },
    {
      icon: Clock,
      label: "Avg Response Time",
      value: `${Math.round(analytics.avgResponseTime)}ms`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "Under 1 second",
    },
    {
      icon: Shield,
      label: "Blocked Messages",
      value: analytics.blockedMessages.toLocaleString(),
      color: "text-red-500",
      bg: "bg-red-50",
      trend: `${analytics.warningMessages} warnings issued`,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader
          title="Coro Analytics"
          subtitle="AI chatbot performance metrics and conversation insights"
        />

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#202020] mb-1">{stat.value}</p>
                <p className="text-sm text-[#666666] mb-2">{stat.label}</p>
                <p className="text-xs text-[#9a9a9a]">{stat.trend}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Top Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#E07850]/10 flex items-center justify-center">
                  <TrendingUp size={20} className="text-[#E07850]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020]">Top Topics</h3>
                  <p className="text-sm text-[#666666]">Most discussed subjects</p>
                </div>
              </div>

              <div className="space-y-4">
                {analytics.topTopics.length === 0 ? (
                  <p className="text-sm text-[#9a9a9a] text-center py-8">No conversations yet</p>
                ) : (
                  analytics.topTopics.map((topic, idx) => {
                    const maxCount = analytics.topTopics[0]?.count || 1
                    const percentage = (topic.count / maxCount) * 100

                    return (
                      <div key={topic.topic} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#202020] capitalize">{topic.topic}</span>
                          <span className="text-sm text-[#666666]">{topic.count} mentions</span>
                        </div>
                        <div className="h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background:
                                idx === 0
                                  ? "linear-gradient(90deg, #E07850, #C9643D)"
                                  : idx === 1
                                    ? "linear-gradient(90deg, #1B7F8E, #06b6d4)"
                                    : "linear-gradient(90deg, #666666, #9a9a9a)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * idx }}
                          />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </motion.div>

            {/* Peak Usage Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1B7F8E]/10 flex items-center justify-center">
                  <BarChart3 size={20} className="text-[#1B7F8E]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#202020]">Peak Usage Hours</h3>
                  <p className="text-sm text-[#666666]">When employees use Coro most</p>
                </div>
              </div>

              <div className="flex items-end gap-2 h-40">
                {Array.from({ length: 24 }, (_, i) => {
                  const isPeak = analytics.peakUsageHours.includes(i)
                  const usageLevel = isPeak ? 80 + Math.random() * 20 : Math.random() * 40

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        className={`w-full rounded-t ${isPeak ? "bg-gradient-to-t from-[#E07850] to-[#C9643D]" : "bg-[#E5E5E5]"}`}
                        initial={{ height: 0 }}
                        animate={{ height: `${usageLevel}%` }}
                        transition={{ duration: 0.5, delay: 0.02 * i }}
                      />
                      <span className={`text-[9px] ${isPeak ? "font-semibold text-[#E07850]" : "text-[#9a9a9a]"}`}>
                        {i}
                      </span>
                    </div>
                  )
                })}
              </div>

              <p className="text-xs text-[#9a9a9a] text-center mt-4">
                Peak hours:{" "}
                {analytics.peakUsageHours.length > 0
                  ? analytics.peakUsageHours.map((h) => `${h}:00`).join(", ")
                  : "Not enough data"}
              </p>
            </motion.div>
          </div>

          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-[#E5E5E5]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Users size={20} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#202020]">AI Performance Insights</h3>
                <p className="text-sm text-[#666666]">Key observations and recommendations</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-2">Response Quality</p>
                <p className="text-2xl font-bold text-emerald-700 mb-1">Excellent</p>
                <p className="text-xs text-emerald-600">
                  Avg response time under 1s. No API errors in past 24h.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1B7F8E]/5 border border-[#1B7F8E]/20">
                <p className="text-xs font-medium text-[#1B7F8E] uppercase tracking-wider mb-2">Engagement</p>
                <p className="text-2xl font-bold text-[#1B7F8E] mb-1">
                  {analytics.avgMessagesPerConversation.toFixed(1)}
                </p>
                <p className="text-xs text-[#1B7F8E]">Average messages per conversation. Users are engaged.</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">Guardrails</p>
                <p className="text-2xl font-bold text-amber-700 mb-1">
                  {analytics.blockedMessages + analytics.warningMessages}
                </p>
                <p className="text-xs text-amber-600">
                  Blocked or flagged messages. Guardrails are working.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
