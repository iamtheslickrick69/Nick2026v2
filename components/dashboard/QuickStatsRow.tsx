"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Users, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react"

const stats = [
  {
    label: "Culture Health Score",
    value: "78",
    change: "+4",
    trend: "up",
    benchmark: "vs 72 industry avg",
    icon: TrendingUp,
    color: "#1B7F8E",
  },
  {
    label: "Active Feedback Loops",
    value: "124",
    change: "+12",
    trend: "up",
    benchmark: "this week",
    icon: MessageSquare,
    color: "#E07850",
  },
  {
    label: "Response Rate",
    value: "73%",
    change: "+8%",
    trend: "up",
    benchmark: "vs 30% traditional",
    icon: Users,
    color: "#06b6d4",
  },
  {
    label: "Open Risk Signals",
    value: "7",
    change: "-3",
    trend: "down",
    benchmark: "from last week",
    icon: AlertTriangle,
    color: "#f59e0b",
  },
  {
    label: "Loops Closed",
    value: "89%",
    change: "+5%",
    trend: "up",
    benchmark: "30-day avg",
    icon: CheckCircle,
    color: "#10b981",
  },
]

function QuickStatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-white rounded-2xl p-5 border border-[#E5E5E5] hover:border-[#E07850]/30 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === "up"
                  ? stat.label.includes("Risk")
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                  : stat.label.includes("Risk")
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
              }`}
            >
              {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.change}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-semibold text-[#202020]">{stat.value}</p>
            <p className="text-sm text-[#666666]">{stat.label}</p>
            <p className="text-xs text-[#9a9a9a]">{stat.benchmark}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default QuickStatsRow
