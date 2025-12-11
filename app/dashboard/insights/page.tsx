"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Heart,
  Clock,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Filter,
  RefreshCw,
  Lightbulb,
  Shield,
} from "lucide-react"

const allInsights = [
  {
    id: 1,
    type: "urgent",
    title: "Burnout Pattern Detected in Engineering",
    summary:
      "3 team members in the Platform team have mentioned workload concerns in the past 48 hours. Sentiment has dropped 12 points.",
    confidence: 87,
    action: "Schedule 1:1s with affected team",
    timestamp: "2 hours ago",
    department: "Engineering",
    category: "Wellness",
  },
  {
    id: 2,
    type: "positive",
    title: "Marketing Team Trust Score Rising",
    summary:
      "Following last month's leadership changes, marketing team engagement is up 23%. Loop closure rate improved to 94%.",
    confidence: 92,
    action: "Share wins with leadership",
    timestamp: "6 hours ago",
    department: "Marketing",
    category: "Culture",
  },
  {
    id: 3,
    type: "warning",
    title: "Retention Risk: Senior Developer",
    summary:
      "Pattern analysis suggests elevated departure risk for 2 senior developers based on reduced engagement and sentiment shifts.",
    confidence: 73,
    action: "Initiate stay interview",
    timestamp: "1 day ago",
    department: "Engineering",
    category: "Retention",
  },
  {
    id: 4,
    type: "insight",
    title: "Communication Gap Identified",
    summary:
      "Feedback analysis reveals employees want more transparency around company strategy and direction. 15 mentions this week.",
    confidence: 81,
    action: "Consider town hall or AMA",
    timestamp: "2 days ago",
    department: "All",
    category: "Communication",
  },
  {
    id: 5,
    type: "positive",
    title: "New Manager Onboarding Success",
    summary: "David Park's team showing 18% sentiment improvement since his management training completion last month.",
    confidence: 88,
    action: "Document and share approach",
    timestamp: "3 days ago",
    department: "Product",
    category: "Leadership",
  },
  {
    id: 6,
    type: "warning",
    title: "Sales Team Compensation Concerns",
    summary:
      "Multiple signals indicate compensation structure frustration in Sales. 8 related messages in past 2 weeks.",
    confidence: 76,
    action: "Review commission structure",
    timestamp: "4 days ago",
    department: "Sales",
    category: "Compensation",
  },
]

const typeFilters = ["all", "urgent", "warning", "positive", "insight"]
const departmentFilters = ["All", "Engineering", "Marketing", "Sales", "Product", "Operations"]

export default function InsightsPage() {
  const [typeFilter, setTypeFilter] = useState("all")
  const [deptFilter, setDeptFilter] = useState("All")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredInsights = allInsights.filter((insight) => {
    const matchesType = typeFilter === "all" || insight.type === typeFilter
    const matchesDept = deptFilter === "All" || insight.department === deptFilter
    return matchesType && matchesDept
  })

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: AlertTriangle,
          color: "text-red-600",
          iconBg: "bg-red-100",
        }
      case "positive":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          icon: TrendingUp,
          color: "text-emerald-600",
          iconBg: "bg-emerald-100",
        }
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: Shield,
          color: "text-amber-600",
          iconBg: "bg-amber-100",
        }
      case "insight":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: Lightbulb,
          color: "text-blue-600",
          iconBg: "bg-blue-100",
        }
      default:
        return {
          bg: "bg-[#F5F3F0]",
          border: "border-[#E5E5E5]",
          icon: Sparkles,
          color: "text-[#666666]",
          iconBg: "bg-[#E5E5E5]",
        }
    }
  }

  const stats = {
    total: allInsights.length,
    urgent: allInsights.filter((i) => i.type === "urgent").length,
    actionable: allInsights.filter((i) => i.confidence > 75).length,
    avgConfidence: Math.round(allInsights.reduce((acc, i) => acc + i.confidence, 0) / allInsights.length),
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader
          title="Coro Insights"
          subtitle="AI-powered analysis and recommendations from employee feedback"
        />

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Insights", value: stats.total, icon: Sparkles, color: "#E07850" },
              { label: "Urgent", value: stats.urgent, icon: AlertTriangle, color: "#ef4444" },
              { label: "High Confidence", value: stats.actionable, icon: TrendingUp, color: "#10b981" },
              { label: "Avg Confidence", value: `${stats.avgConfidence}%`, icon: Heart, color: "#1B7F8E" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-[#E5E5E5]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#202020]">{stat.value}</p>
                <p className="text-sm text-[#666666]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-[#666666]" />
                  <span className="text-sm text-[#666666]">Type:</span>
                  <div className="flex gap-1">
                    {typeFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTypeFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${
                          typeFilter === filter
                            ? "bg-[#E07850] text-white"
                            : "bg-[#F5F3F0] text-[#666666] hover:bg-[#ECEAE6]"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#666666]">Department:</span>
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="h-9 px-3 rounded-xl bg-[#F5F3F0] border-none text-sm cursor-pointer outline-none"
                  >
                    {departmentFilters.map((filter) => (
                      <option key={filter} value={filter}>
                        {filter}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium hover:shadow-lg transition-all"
              >
                <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 1 }}>
                  <RefreshCw size={14} />
                </motion.div>
                Refresh Insights
              </button>
            </div>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredInsights.map((insight, index) => {
                const styles = getTypeStyles(insight.type)
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-all`}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                          <styles.icon size={18} className={styles.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.color} capitalize`}
                            >
                              {insight.type}
                            </span>
                            <span className="text-xs text-[#9a9a9a]">{insight.department}</span>
                            <span className="text-xs text-[#9a9a9a]">•</span>
                            <span className="text-xs text-[#9a9a9a] flex items-center gap-1">
                              <Clock size={10} />
                              {insight.timestamp}
                            </span>
                          </div>
                          <h4 className="text-base font-semibold text-[#202020] mb-2">{insight.title}</h4>
                          <p className="text-sm text-[#666666] line-clamp-2">{insight.summary}</p>
                        </div>
                      </div>

                      {/* Confidence + Action */}
                      <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#666666]">Confidence:</span>
                            <div className="w-20 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${insight.confidence}%`,
                                  background:
                                    insight.confidence > 80
                                      ? "#10b981"
                                      : insight.confidence > 60
                                        ? "#f59e0b"
                                        : "#ef4444",
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-[#202020]">{insight.confidence}%</span>
                          </div>
                          <span className="text-xs text-[#9a9a9a] bg-[#F5F3F0] px-2 py-0.5 rounded-full">
                            {insight.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium flex items-center justify-center gap-1 hover:shadow-md transition-all">
                            {insight.action}
                            <ChevronRight size={14} />
                          </button>
                          <button className="p-2 rounded-xl border border-[#E5E5E5] hover:bg-emerald-50 hover:border-emerald-200 text-[#666666] hover:text-emerald-600 transition-all">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="p-2 rounded-xl border border-[#E5E5E5] hover:bg-red-50 hover:border-red-200 text-[#666666] hover:text-red-600 transition-all">
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
