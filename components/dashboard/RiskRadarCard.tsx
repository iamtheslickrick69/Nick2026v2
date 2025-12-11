"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, Users, DollarSign, ChevronRight } from "lucide-react"

const risks = [
  {
    id: 1,
    category: "Retention",
    level: "high",
    score: 78,
    trend: "rising",
    description: "3 high-performers showing disengagement signals",
    icon: Users,
  },
  {
    id: 2,
    category: "Legal",
    level: "medium",
    score: 45,
    trend: "stable",
    description: "Ongoing harassment concern in Sales",
    icon: AlertTriangle,
  },
  {
    id: 3,
    category: "Financial",
    level: "low",
    score: 23,
    trend: "declining",
    description: "Compensation sentiment improving",
    icon: DollarSign,
  },
]

function RiskRadarCard() {
  const getLevelStyles = (level: string) => {
    switch (level) {
      case "high":
        return { bg: "bg-red-500", text: "text-red-600", light: "bg-red-50" }
      case "medium":
        return { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" }
      case "low":
        return { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" }
      default:
        return { bg: "bg-gray-500", text: "text-gray-600", light: "bg-gray-50" }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-[#202020]">Risk Radar</h3>
          <p className="text-sm text-[#666666]">Predictive risk assessment</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />1 High Risk
        </div>
      </div>

      {/* Risk Items */}
      <div className="space-y-3">
        {risks.map((risk, index) => {
          const styles = getLevelStyles(risk.level)
          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`p-4 rounded-xl ${styles.light} border border-transparent hover:border-[#E5E5E5] transition-all cursor-pointer group`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${styles.bg}/10 flex items-center justify-center`}>
                  <risk.icon size={18} className={styles.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#202020]">{risk.category}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${styles.text}`}>{risk.score}%</span>
                      <TrendingUp size={12} className={risk.trend === "rising" ? "text-red-500" : "text-emerald-500"} />
                    </div>
                  </div>
                  <p className="text-xs text-[#666666] line-clamp-1">{risk.description}</p>
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${styles.bg} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 * index }}
                    />
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#9a9a9a] group-hover:text-[#202020] group-hover:translate-x-1 transition-all"
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* CTA */}
      <button className="w-full mt-4 py-3 rounded-xl border border-[#E5E5E5] hover:border-[#E07850]/30 hover:bg-[#E07850]/5 text-sm font-medium text-[#202020] flex items-center justify-center gap-2 transition-all group">
        View Full Risk Report
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  )
}

export default RiskRadarCard
