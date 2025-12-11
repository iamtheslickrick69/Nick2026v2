"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, TrendingDown, Calendar, Users, User } from "lucide-react"
import { useDashboardStore } from "@/lib/dashboardStore"

// Extended 30-day data
const extended30DayData = [
  68, 69, 70, 68, 71, 72, 72, // Last 7 days (from culturePulse)
  70, 69, 71, 73, 72, 71, 70, // Week 2
  69, 68, 67, 66, 68, 69, 70, // Week 3
  71, 72, 73, 74, 73, 72, 71, // Week 4
  70, 69, 68, // Days 28-30
]

const annotations = [
  { day: 5, label: "Q4 Deadline Announced", type: "negative" },
  { day: 14, label: "Town Hall Meeting", type: "positive" },
  { day: 23, label: "Team Offsite", type: "positive" },
]

export default function TrendAnalysisModal() {
  const { trendAnalysisModal, setTrendAnalysisModal } = useDashboardStore()

  const handleClose = () => setTrendAnalysisModal(false)

  // Calculate stats
  const currentScore = extended30DayData[extended30DayData.length - 1]
  const previousScore = extended30DayData[extended30DayData.length - 2]
  const change = currentScore - previousScore
  const thirtyDayAvg = Math.round(extended30DayData.reduce((a, b) => a + b, 0) / extended30DayData.length)
  const highestScore = Math.max(...extended30DayData)
  const lowestScore = Math.min(...extended30DayData)

  return (
    <AnimatePresence>
      {trendAnalysisModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5E5E5]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#202020] mb-2">Culture Pulse Trend Analysis</h2>
                    <p className="text-sm text-[#666666]">30-day historical view with key events</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-[#F5F3F0] text-[#666666] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="p-6 border-b border-[#E5E5E5] bg-[#F5F3F0]">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[#666666] mb-1">Current Score</p>
                    <p className="text-2xl font-bold text-[#1B7F8E]">{currentScore}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {change > 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      )}
                      <span className={`text-xs font-semibold ${change > 0 ? "text-green-600" : "text-red-600"}`}>
                        {change > 0 ? "+" : ""}
                        {change} vs yesterday
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] mb-1">30-Day Average</p>
                    <p className="text-2xl font-bold text-[#202020]">{thirtyDayAvg}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] mb-1">Highest</p>
                    <p className="text-2xl font-bold text-green-600">{highestScore}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] mb-1">Lowest</p>
                    <p className="text-2xl font-bold text-red-600">{lowestScore}</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="p-6">
                <div className="relative">
                  {/* SVG Chart */}
                  <svg width="100%" height="300" viewBox="0 0 800 300" className="overflow-visible">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const y = (i / 4) * 280 + 10
                      return (
                        <g key={i}>
                          <line x1="0" y1={y} x2="800" y2={y} stroke="#E5E5E5" strokeWidth="1" />
                          <text x="-10" y={y + 4} fill="#9a9a9a" fontSize="12" textAnchor="end">
                            {100 - i * 25}
                          </text>
                        </g>
                      )
                    })}

                    {/* Area under curve */}
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1B7F8E" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#1B7F8E" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {(() => {
                      const points = extended30DayData.map((value, index) => {
                        const x = (index / (extended30DayData.length - 1)) * 800
                        const y = 290 - (value / 100) * 280
                        return `${x},${y}`
                      })
                      const areaPath = `M 0,290 L ${points.join(" L ")} L 800,290 Z`
                      const linePath = `M ${points.join(" L ")}`

                      return (
                        <>
                          <motion.path
                            d={areaPath}
                            fill="url(#areaGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.path
                            d={linePath}
                            fill="none"
                            stroke="#1B7F8E"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                        </>
                      )
                    })()}

                    {/* Data points */}
                    {extended30DayData.map((value, index) => {
                      const x = (index / (extended30DayData.length - 1)) * 800
                      const y = 290 - (value / 100) * 280
                      return (
                        <motion.circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#1B7F8E"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.02 }}
                        />
                      )
                    })}

                    {/* Annotations */}
                    {annotations.map((annotation, index) => {
                      const x = (annotation.day / (extended30DayData.length - 1)) * 800
                      const y = 290 - (extended30DayData[annotation.day] / 100) * 280
                      return (
                        <g key={index}>
                          <motion.line
                            x1={x}
                            y1={y}
                            x2={x}
                            y2={y - 40}
                            stroke={annotation.type === "positive" ? "#10b981" : "#ef4444"}
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + index * 0.2 }}
                          />
                          <motion.circle
                            cx={x}
                            cy={y - 40}
                            r="6"
                            fill={annotation.type === "positive" ? "#10b981" : "#ef4444"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + index * 0.2, type: "spring" }}
                          />
                        </g>
                      )
                    })}
                  </svg>

                  {/* Annotation Labels */}
                  <div className="mt-4 space-y-2">
                    {annotations.map((annotation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${annotation.type === "positive" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <Calendar className="w-4 h-4 text-[#666666]" />
                        <span className="text-[#666666]">Day {annotation.day}:</span>
                        <span className="font-medium text-[#202020]">{annotation.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="p-6 border-t border-[#E5E5E5] bg-[#F5F3F0]">
                <h3 className="text-sm font-semibold text-[#202020] mb-3">Key Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5]">
                    <Users className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#202020] mb-1">Employee Engagement</p>
                      <p className="text-xs text-[#666666]">Team offsite on Day 23 led to 3-point improvement in scores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5]">
                    <User className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#202020] mb-1">Customer Sentiment</p>
                      <p className="text-xs text-[#666666]">Stable trend with slight uptick in last 7 days (+2 points)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#E5E5E5] flex items-center justify-between">
                <p className="text-xs text-[#666666]">
                  Based on <span className="font-semibold text-[#202020]">850 employees</span> and{" "}
                  <span className="font-semibold text-[#202020]">2,000 customers</span>
                </p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] text-white font-semibold text-sm hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
