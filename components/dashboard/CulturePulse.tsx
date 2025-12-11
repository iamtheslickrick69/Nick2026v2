"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { culturePulse } from "@/lib/dashboardData"

export default function CulturePulse() {
  const { currentScore, previousScore, change, trend, last7Days } = culturePulse

  // Calculate max value for sparkline scaling
  const maxValue = Math.max(...last7Days)
  const minValue = Math.min(...last7Days)
  const range = maxValue - minValue || 1

  // Generate SVG path for sparkline
  const width = 200
  const height = 40
  const points = last7Days.map((value, index) => {
    const x = (index / (last7Days.length - 1)) * width
    const y = height - ((value - minValue) / range) * height
    return `${x},${y}`
  })
  const pathData = `M ${points.join(" L ")}`

  // Determine status color and message
  const getStatusInfo = () => {
    if (currentScore >= 80) {
      return {
        status: "Excellent",
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
      }
    } else if (currentScore >= 70) {
      return {
        status: "Healthy",
        color: "text-teal-600",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/20",
      }
    } else if (currentScore >= 60) {
      return {
        status: "At Risk",
        color: "text-yellow-600",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/20",
      }
    } else {
      return {
        status: "Critical",
        color: "text-red-600",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
      }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#202020]">Culture Pulse</h3>
        <motion.div
          className={`px-3 py-1 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className={`text-sm font-semibold ${statusInfo.color}`}>{statusInfo.status}</span>
        </motion.div>
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
            className="text-6xl font-black text-[#1B7F8E]"
          >
            {currentScore}
          </motion.div>
          <p className="text-sm text-[#666666] mt-1">out of 100</p>
        </div>

        {/* Trend Indicator */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-right"
        >
          <div className="flex items-center gap-2 mb-1">
            {trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <span
              className={`text-2xl font-bold ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {change > 0 ? "+" : ""}
              {change}
            </span>
          </div>
          <p className="text-xs text-[#666666]">from last week</p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-[#F5F3F0] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${currentScore}%` }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] rounded-full"
          />
        </div>
      </div>

      {/* 7-Day Sparkline */}
      <div className="pt-4 border-t border-[#E5E5E5]">
        <p className="text-xs text-[#666666] mb-3 font-medium">Last 7 Days</p>
        <motion.svg
          width={width}
          height={height}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Background grid lines */}
          <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#E5E5E5" strokeWidth="1" />

          {/* Sparkline path */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#1B7F8E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
          />

          {/* Data points */}
          {last7Days.map((value, index) => {
            const x = (index / (last7Days.length - 1)) * width
            const y = height - ((value - minValue) / range) * height
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="#1B7F8E"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
              />
            )
          })}
        </motion.svg>

        {/* Day labels */}
        <div className="flex justify-between mt-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <span key={index} className="text-[10px] text-[#666666]">
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-4 pt-4 border-t border-[#E5E5E5]"
      >
        <p className="text-xs text-[#666666]">
          Based on <span className="font-semibold text-[#202020]">850 employees</span> and{" "}
          <span className="font-semibold text-[#202020]">2,000 customers</span>
        </p>
      </motion.div>
    </motion.div>
  )
}
