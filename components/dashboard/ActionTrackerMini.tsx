"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"

const actions = [
  { id: 1, status: "completed", title: "Burnout feedback acknowledged", manager: "Sarah K.", time: "2h ago" },
  { id: 2, status: "in-progress", title: "1:1 scheduled with Engineering", manager: "Mike R.", time: "4h ago" },
  { id: 3, status: "pending", title: "Compensation review requested", manager: "Pending", time: "1d ago" },
]

function ActionTrackerMini() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={14} className="text-emerald-500" />
      case "in-progress":
        return <Clock size={14} className="text-amber-500" />
      case "pending":
        return <AlertCircle size={14} className="text-red-500" />
      default:
        return null
    }
  }

  const completedCount = actions.filter((a) => a.status === "completed").length
  const totalCount = actions.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[#202020]">Action Tracker</h3>
        <span className="text-xs text-[#666666]">
          {completedCount}/{totalCount} closed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-[#F5F3F0] rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / totalCount) * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Actions List */}
      <div className="space-y-2">
        {actions.map((action) => (
          <div
            key={action.id}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F3F0] transition-colors cursor-pointer"
          >
            {getStatusIcon(action.status)}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#202020] truncate">{action.title}</p>
              <p className="text-xs text-[#9a9a9a]">{action.manager}</p>
            </div>
            <span className="text-xs text-[#9a9a9a]">{action.time}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-3 py-2.5 rounded-xl border border-[#E5E5E5] hover:border-[#E07850]/30 text-sm font-medium text-[#666666] hover:text-[#202020] flex items-center justify-center gap-1 transition-all group">
        View All
        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  )
}

export default ActionTrackerMini
