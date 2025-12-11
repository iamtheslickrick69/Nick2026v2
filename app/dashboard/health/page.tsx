"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Shield,
  Heart,
  ChevronRight,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const departments = [
  { name: "Engineering", score: 84, change: +6, members: 45, participation: 78 },
  { name: "Marketing", score: 91, change: +12, members: 18, participation: 94 },
  { name: "Sales", score: 67, change: -4, members: 32, participation: 65 },
  { name: "Product", score: 72, change: +2, members: 12, participation: 83 },
  { name: "Operations", score: 79, change: +8, members: 28, participation: 71 },
  { name: "HR", score: 88, change: +3, members: 8, participation: 100 },
]

const healthFactors = [
  { name: "Trust in Leadership", score: 76, weight: 25, trend: "up", icon: Shield },
  { name: "Psychological Safety", score: 82, weight: 20, trend: "up", icon: Heart },
  { name: "Communication Quality", score: 71, weight: 20, trend: "down", icon: MessageSquare },
  { name: "Work-Life Balance", score: 68, weight: 15, trend: "down", icon: Users },
  { name: "Growth Opportunities", score: 74, weight: 10, trend: "stable", icon: TrendingUp },
  { name: "Recognition", score: 79, weight: 10, trend: "up", icon: Heart },
]

const trendData = [
  { month: "Jul", score: 68 },
  { month: "Aug", score: 71 },
  { month: "Sep", score: 69 },
  { month: "Oct", score: 74 },
  { month: "Nov", score: 76 },
  { month: "Dec", score: 78 },
]

export default function HealthPage() {
  const [animatedScore, setAnimatedScore] = useState(0)
  const targetScore = 78

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
      }, 15)
      return () => clearInterval(interval)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const circumference = 2 * Math.PI * 90

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader title="Culture Health" subtitle="Comprehensive view of organizational trust and engagement" />

        <div className="p-6 space-y-6">
          {/* Main Score + Trend */}
          <div className="grid grid-cols-12 gap-6">
            {/* Main Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-12 lg:col-span-5 bg-white rounded-2xl p-8 border border-[#E5E5E5]"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#202020]">Overall Health Score</h3>
                  <p className="text-sm text-[#666666]">Real-time organizational trust index</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-[#F5F3F0] text-[#666666]">
                  <Info size={18} />
                </button>
              </div>

              <div className="flex items-center gap-8">
                {/* Circular Score */}
                <div className="relative">
                  <svg width="220" height="220" className="transform -rotate-90">
                    <circle cx="110" cy="110" r="90" stroke="#F5F3F0" strokeWidth="16" fill="none" />
                    <motion.circle
                      cx="110"
                      cy="110"
                      r="90"
                      stroke="url(#healthGradientLarge)"
                      strokeWidth="16"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - (animatedScore / 100) * circumference }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="healthGradientLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1B7F8E" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold text-[#202020]">{animatedScore}</span>
                    <span className="text-sm text-[#666666]">out of 100</span>
                  </div>
                </div>

                {/* Benchmarks */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">vs Last Month</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <ArrowUpRight size={16} />
                      +4 pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Industry Average</span>
                    <span className="text-[#202020] font-medium">72</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Top 10%</span>
                    <span className="text-[#202020] font-medium">88</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">Your Rank</span>
                    <span className="text-[#E07850] font-semibold">Top 25%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-12 lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E5E5E5]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#202020]">6-Month Trend</h3>
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <TrendingUp size={16} />
                  +10 pts since July
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between h-48 px-4">
                {trendData.map((item, index) => (
                  <div key={item.month} className="flex flex-col items-center gap-2">
                    <motion.div
                      className="w-12 rounded-t-lg"
                      style={{
                        background:
                          index === trendData.length - 1
                            ? "linear-gradient(180deg, #E07850, #C9643D)"
                            : "linear-gradient(180deg, #1B7F8E, #06b6d4)",
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.score / 100) * 160}px` }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    />
                    <span className="text-xs text-[#666666]">{item.month}</span>
                    <span className="text-sm font-medium text-[#202020]">{item.score}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Health Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-[#E5E5E5]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#202020]">Health Score Breakdown</h3>
                <p className="text-sm text-[#666666]">Weighted factors contributing to overall score</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {healthFactors.map((factor, index) => (
                <motion.div
                  key={factor.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="p-4 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: factor.score >= 75 ? "#1B7F8E20" : "#E0785020" }}
                    >
                      <factor.icon size={18} style={{ color: factor.score >= 75 ? "#1B7F8E" : "#E07850" }} />
                    </div>
                    <div className="flex items-center gap-1">
                      {factor.trend === "up" && <ArrowUpRight size={14} className="text-emerald-500" />}
                      {factor.trend === "down" && <ArrowDownRight size={14} className="text-red-500" />}
                      <span className="text-xs text-[#9a9a9a]">{factor.weight}% weight</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#202020] mb-2">{factor.name}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: factor.score >= 75 ? "#1B7F8E" : factor.score >= 60 ? "#f59e0b" : "#ef4444",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.score}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                      />
                    </div>
                    <span className="text-lg font-semibold text-[#202020]">{factor.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Department Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
          >
            <div className="p-6 border-b border-[#E5E5E5]">
              <h3 className="text-lg font-semibold text-[#202020]">Department Health</h3>
              <p className="text-sm text-[#666666]">Compare culture health across teams</p>
            </div>

            <div className="divide-y divide-[#E5E5E5]">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="p-5 hover:bg-[#F5F3F0]/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    {/* Department Name */}
                    <div className="w-32">
                      <p className="font-medium text-[#202020]">{dept.name}</p>
                      <p className="text-xs text-[#9a9a9a]">{dept.members} members</p>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-3 w-24">
                      <span
                        className={`text-2xl font-bold ${dept.score >= 80 ? "text-emerald-600" : dept.score >= 70 ? "text-amber-600" : "text-red-600"}`}
                      >
                        {dept.score}
                      </span>
                      <span
                        className={`flex items-center gap-0.5 text-xs font-medium ${dept.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {dept.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {dept.change >= 0 ? "+" : ""}
                        {dept.change}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1">
                      <div className="h-3 bg-[#F5F3F0] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              dept.score >= 80
                                ? "linear-gradient(90deg, #10b981, #06b6d4)"
                                : dept.score >= 70
                                  ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                                  : "linear-gradient(90deg, #ef4444, #f87171)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.score}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * index }}
                        />
                      </div>
                    </div>

                    {/* Participation */}
                    <div className="w-24 text-right">
                      <p className="text-sm font-medium text-[#202020]">{dept.participation}%</p>
                      <p className="text-xs text-[#9a9a9a]">participation</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={18}
                      className="text-[#9a9a9a] group-hover:text-[#202020] group-hover:translate-x-1 transition-all"
                    />
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
