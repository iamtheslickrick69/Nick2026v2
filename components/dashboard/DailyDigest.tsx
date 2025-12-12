"use client"

import { motion } from "framer-motion"
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown, Lightbulb, Zap, ArrowRight, MessageSquare } from "lucide-react"
import { todaysDigest } from "@/lib/dashboardData"

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "critical":
      return {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-600",
        icon: AlertTriangle,
        label: "Critical",
        iconColor: "text-red-600",
      }
    case "trending_up":
      return {
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        text: "text-green-600",
        icon: TrendingUp,
        label: "Trending Up",
        iconColor: "text-green-600",
      }
    case "trending_down":
      return {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        text: "text-yellow-600",
        icon: TrendingDown,
        label: "Trending Down",
        iconColor: "text-yellow-600",
      }
    case "insight":
      return {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-600",
        icon: Lightbulb,
        label: "Insight",
        iconColor: "text-purple-600",
      }
    case "action_required":
      return {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-600",
        icon: Zap,
        label: "Action Required",
        iconColor: "text-blue-600",
      }
    default:
      return {
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        text: "text-gray-600",
        icon: Sparkles,
        label: "Info",
        iconColor: "text-gray-600",
      }
  }
}

export default function DailyDigest() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#202020]">Daily Intelligence Brief</h3>
            <p className="text-xs text-[#666666]">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* Item Count */}
        <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          <span className="text-sm font-bold text-blue-600">{todaysDigest.length}</span>
        </div>
      </div>

      {/* Digest Items */}
      <div className="space-y-3">
        {todaysDigest.map((item, index) => {
          const styles = getPriorityStyles(item.priority)
          const Icon = styles.icon

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              className={`p-4 rounded-xl border-2 ${styles.border} ${styles.bg} cursor-pointer transition-all`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${styles.bg} border ${styles.border} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold ${styles.text} uppercase tracking-wide`}>{styles.label}</span>
                    {item.messageCount && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-[#666666]" />
                        <span className="text-xs font-bold text-[#666666]">{item.messageCount}</span>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#202020] mb-1">{item.title}</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Action Link */}
              {item.actionLink && (
                <div className="mt-3 pt-3 border-t border-current/10">
                  <motion.button
                    whileHover={{ x: 2 }}
                    className={`flex items-center gap-1.5 text-xs font-semibold ${styles.text}`}
                  >
                    Take Action
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#666666]">
            Curated by <span className="font-semibold text-[#202020]">Coro AI</span>
          </p>
          <span className="text-xs text-[#666666]">Updated 5m ago</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          View Full Intelligence Report
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
