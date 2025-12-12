"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Info, ChevronRight } from "lucide-react"

function CultureHealthScore() {
  const [animatedScore, setAnimatedScore] = useState(0)
  const targetScore = 78
  const previousScore = 74
  const industryAvg = 72
  const topPerformers = 88

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval)
            return targetScore
          }
          return prev + 1
        })
      }, 20)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const circumference = 2 * Math.PI * 80
  const progress = (animatedScore / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#202020]">Culture Health Score</h3>
          <p className="text-sm text-[#666666]">Real-time organizational trust index</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-[#F5F3F0] text-[#666666] transition-colors">
          <Info size={16} />
        </button>
      </div>

      {/* Circular Progress */}
      <div className="relative flex items-center justify-center mb-6">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" stroke="#F5F3F0" strokeWidth="12" fill="none" />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#healthGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B7F8E" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-bold text-[#202020]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {animatedScore}
          </motion.span>
          <span className="text-sm text-[#666666]">out of 100</span>
          <div className="flex items-center gap-1 mt-1 text-emerald-600 text-sm font-medium">
            <TrendingUp size={14} />
            <span>+{targetScore - previousScore} this month</span>
          </div>
        </div>
      </div>

      {/* Benchmarks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666666]">Industry Average</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#9a9a9a] rounded-full" style={{ width: `${industryAvg}%` }} />
            </div>
            <span className="text-[#202020] font-medium w-8">{industryAvg}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666666]">Top 10% Performers</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#1B7F8E] rounded-full" style={{ width: `${topPerformers}%` }} />
            </div>
            <span className="text-[#202020] font-medium w-8">{topPerformers}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666666]">Your Score</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #1B7F8E, #06b6d4)" }}
                initial={{ width: 0 }}
                animate={{ width: `${targetScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <span className="text-[#14b8a6] font-semibold w-8">{targetScore}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full mt-6 py-3 rounded-xl border border-[#E5E5E5] hover:border-[#14b8a6]/30 hover:bg-[#14b8a6]/5 text-sm font-medium text-[#202020] flex items-center justify-center gap-2 transition-all group">
        View Detailed Breakdown
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  )
}

export default CultureHealthScore
