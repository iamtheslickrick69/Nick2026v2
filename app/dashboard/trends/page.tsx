"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { TrendingUp, TrendingDown, Hash, MessageSquare, BarChart3, Filter } from "lucide-react"

const trendingTopics = [
  { topic: "#workload", count: 47, change: +23, sentiment: "negative", category: "Operations" },
  { topic: "#management", count: 34, change: +12, sentiment: "mixed", category: "Leadership" },
  { topic: "#growth", count: 28, change: +8, sentiment: "positive", category: "Career" },
  { topic: "#recognition", count: 24, change: +15, sentiment: "positive", category: "Culture" },
  { topic: "#compensation", count: 21, change: -3, sentiment: "negative", category: "Benefits" },
  { topic: "#flexibility", count: 19, change: +5, sentiment: "positive", category: "Work-Life" },
  { topic: "#communication", count: 18, change: +9, sentiment: "mixed", category: "Culture" },
  { topic: "#deadlines", count: 16, change: +11, sentiment: "negative", category: "Operations" },
]

const sentimentTrend = [
  { week: "W1", positive: 45, neutral: 35, negative: 20 },
  { week: "W2", positive: 48, neutral: 32, negative: 20 },
  { week: "W3", positive: 42, neutral: 38, negative: 20 },
  { week: "W4", positive: 51, neutral: 30, negative: 19 },
]

const departmentActivity = [
  { name: "Engineering", messages: 156, sentiment: 72 },
  { name: "Sales", messages: 98, sentiment: 65 },
  { name: "Marketing", messages: 67, sentiment: 88 },
  { name: "Product", messages: 45, sentiment: 74 },
  { name: "Operations", messages: 89, sentiment: 71 },
]

export default function TrendsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-amber-600"
    }
  }

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-50"
      case "negative":
        return "bg-red-50"
      default:
        return "bg-amber-50"
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader
          title="Trends & Analytics"
          subtitle="Discover patterns and emerging themes in employee feedback"
        />

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter size={16} className="text-[#666666]" />
                <span className="text-sm text-[#666666]">Time Range:</span>
                <div className="flex gap-1">
                  {["7d", "30d", "90d", "1y"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        timeRange === range
                          ? "bg-[#E07850] text-white"
                          : "bg-[#F5F3F0] text-[#666666] hover:bg-[#ECEAE6]"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  Positive
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  Neutral
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  Negative
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
            >
              <div className="p-6 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <Hash size={18} className="text-[#E07850]" />
                  <h3 className="text-lg font-semibold text-[#202020]">Trending Topics</h3>
                </div>
                <p className="text-sm text-[#666666] mt-1">Most discussed themes this month</p>
              </div>

              <div className="divide-y divide-[#E5E5E5]">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 * index }}
                    className="p-4 hover:bg-[#F5F3F0]/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-mono text-[#9a9a9a] w-6">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#1B7F8E]">{topic.topic}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getSentimentBg(topic.sentiment)} ${getSentimentColor(topic.sentiment)}`}
                          >
                            {topic.sentiment}
                          </span>
                        </div>
                        <span className="text-xs text-[#9a9a9a]">{topic.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#202020]">{topic.count}</p>
                        <p
                          className={`text-xs flex items-center gap-0.5 justify-end ${topic.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
                        >
                          {topic.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {topic.change >= 0 ? "+" : ""}
                          {topic.change}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sentiment Over Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-12 lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 size={18} className="text-[#1B7F8E]" />
                <h3 className="text-lg font-semibold text-[#202020]">Sentiment Distribution</h3>
              </div>

              {/* Stacked Bar Chart */}
              <div className="space-y-4">
                {sentimentTrend.map((week, index) => (
                  <motion.div
                    key={week.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-sm text-[#666666] w-8">{week.week}</span>
                    <div className="flex-1 h-8 flex rounded-lg overflow-hidden">
                      <motion.div
                        className="bg-emerald-500 flex items-center justify-center"
                        initial={{ width: 0 }}
                        animate={{ width: `${week.positive}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <span className="text-xs text-white font-medium">{week.positive}%</span>
                      </motion.div>
                      <motion.div
                        className="bg-amber-400 flex items-center justify-center"
                        initial={{ width: 0 }}
                        animate={{ width: `${week.neutral}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.1 }}
                      >
                        <span className="text-xs text-white font-medium">{week.neutral}%</span>
                      </motion.div>
                      <motion.div
                        className="bg-red-500 flex items-center justify-center"
                        initial={{ width: 0 }}
                        animate={{ width: `${week.negative}%` }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
                      >
                        <span className="text-xs text-white font-medium">{week.negative}%</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E5E5E5]">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">51%</p>
                  <p className="text-sm text-[#666666]">Positive Trend</p>
                  <p className="text-xs text-emerald-600">+6% this month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">30%</p>
                  <p className="text-sm text-[#666666]">Neutral</p>
                  <p className="text-xs text-[#9a9a9a]">-5% this month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">19%</p>
                  <p className="text-sm text-[#666666]">Negative</p>
                  <p className="text-xs text-emerald-600">-1% this month</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Department Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-[#E5E5E5]"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={18} className="text-[#E07850]" />
              <h3 className="text-lg font-semibold text-[#202020]">Department Activity</h3>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {departmentActivity.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="p-4 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] transition-colors cursor-pointer"
                >
                  <p className="font-medium text-[#202020] mb-3">{dept.name}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-[#202020]">{dept.messages}</p>
                      <p className="text-xs text-[#666666]">messages</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${dept.sentiment}%`,
                            background: dept.sentiment >= 80 ? "#10b981" : dept.sentiment >= 70 ? "#f59e0b" : "#ef4444",
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-[#202020]">{dept.sentiment}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
