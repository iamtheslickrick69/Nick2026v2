"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, AlertTriangle, TrendingUp, Users, ChevronRight, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "urgent",
    title: "Burnout Pattern Detected in Engineering",
    summary:
      "3 team members in the Platform team have mentioned workload concerns in the past 48 hours. Sentiment has dropped 12 points.",
    confidence: 87,
    action: "Schedule 1:1s with affected team",
    timestamp: "2 hours ago",
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
  },
]

function CoroInsightsCard() {
  const [selectedInsight, setSelectedInsight] = useState(insights[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

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
          icon: Users,
          color: "text-amber-600",
          iconBg: "bg-amber-100",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center relative"
              style={{
                background: "conic-gradient(from 0deg, #E07850, #1B7F8E, #06b6d4, #E07850)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute inset-0.5 bg-white rounded-[10px]" />
              <Sparkles size={18} className="relative z-10 text-[#E07850]" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-[#202020]">Coro Insights</h3>
              <p className="text-sm text-[#666666]">AI-powered analysis from employee feedback</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg hover:bg-[#F5F3F0] text-[#666666] transition-colors"
          >
            <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 1 }}>
              <RefreshCw size={16} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Insights List */}
      <div className="flex">
        {/* Left: List */}
        <div className="w-2/5 border-r border-[#E5E5E5] max-h-[400px] overflow-y-auto">
          {insights.map((insight) => {
            const styles = getTypeStyles(insight.type)
            const isSelected = selectedInsight.id === insight.id
            return (
              <button
                key={insight.id}
                onClick={() => setSelectedInsight(insight)}
                className={`w-full p-4 text-left border-b border-[#E5E5E5] last:border-b-0 transition-all ${
                  isSelected ? "bg-[#F5F3F0]" : "hover:bg-[#F5F3F0]/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <styles.icon size={14} className={styles.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#202020] line-clamp-2">{insight.title}</p>
                    <p className="text-xs text-[#9a9a9a] mt-1">{insight.timestamp}</p>
                  </div>
                  {isSelected && <div className="w-1 h-8 bg-[#E07850] rounded-full" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Right: Detail */}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedInsight.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {(() => {
                const styles = getTypeStyles(selectedInsight.type)
                return (
                  <>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${styles.bg}`}>
                      <styles.icon size={14} className={styles.color} />
                      <span className={`text-xs font-medium ${styles.color} capitalize`}>{selectedInsight.type}</span>
                    </div>

                    <h4 className="text-xl font-semibold text-[#202020]">{selectedInsight.title}</h4>

                    <p className="text-[#666666] leading-relaxed">{selectedInsight.summary}</p>

                    {/* Confidence */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#666666]">Confidence:</span>
                      <div className="flex-1 h-2 bg-[#F5F3F0] rounded-full overflow-hidden max-w-[120px]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              selectedInsight.confidence > 80
                                ? "linear-gradient(90deg, #1B7F8E, #06b6d4)"
                                : selectedInsight.confidence > 60
                                  ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                                  : "linear-gradient(90deg, #ef4444, #f87171)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedInsight.confidence}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#202020]">{selectedInsight.confidence}%</span>
                    </div>

                    {/* Suggested Action */}
                    <div className="p-4 rounded-xl bg-[#F5F3F0] border border-[#E5E5E5]">
                      <p className="text-xs text-[#9a9a9a] uppercase tracking-wider mb-1">Suggested Action</p>
                      <p className="text-sm font-medium text-[#202020]">{selectedInsight.action}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                        Take Action
                        <ChevronRight size={14} />
                      </button>
                      <button className="p-2.5 rounded-xl border border-[#E5E5E5] hover:bg-emerald-50 hover:border-emerald-200 text-[#666666] hover:text-emerald-600 transition-all">
                        <ThumbsUp size={16} />
                      </button>
                      <button className="p-2.5 rounded-xl border border-[#E5E5E5] hover:bg-red-50 hover:border-red-200 text-[#666666] hover:text-red-600 transition-all">
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default CoroInsightsCard
