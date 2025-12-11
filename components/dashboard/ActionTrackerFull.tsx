"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Clock, ArrowRight, MessageSquare } from "lucide-react"
import { actionItems } from "@/lib/dashboardData"

export default function ActionTrackerFull() {
  const inProgressActions = actionItems.filter((action) => action.status === "in_progress")
  const pendingActions = actionItems.filter((action) => action.status === "pending")
  const completedActions = actionItems.filter((action) => action.status === "completed")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E07850] to-[#d96a3f] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#202020]">Action Tracker</h3>
            <p className="text-xs text-[#666666]">Closing the feedback loop</p>
          </div>
        </div>

        {/* Status Counts */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-[#E07850]">{inProgressActions.length + pendingActions.length}</div>
            <div className="text-[10px] text-[#666666] uppercase">Open</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{completedActions.length}</div>
            <div className="text-[10px] text-[#666666] uppercase">Done</div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="space-y-4">
        {/* In Progress Actions */}
        {inProgressActions.slice(0, 2).map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            className="p-4 rounded-xl border-2 border-[#E5E5E5] bg-gradient-to-br from-white to-[#F5F3F0]/30 cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mt-0.5"
              >
                <Circle className="w-5 h-5 text-[#E07850]" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#202020] mb-1">{action.title}</h4>
                <p className="text-xs text-[#666666] mb-2">{action.description}</p>

                {/* Owner & Department */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium text-[#202020]">{action.owner}</span>
                  <span className="text-[#666666]">·</span>
                  <span className="text-[#666666]">{action.ownerRole}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#666666]">Progress</span>
                <span className="text-xs font-bold text-[#E07850]">{action.progress}%</span>
              </div>
              <div className="h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${action.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#E07850] to-[#d96a3f] rounded-full"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#666666]" />
                <span className="text-xs text-[#666666]">
                  Due {action.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#666666]" />
                <span className="text-xs font-semibold text-[#666666]">{action.relatedMessages}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Completed Actions (Last 2) */}
        {completedActions.slice(0, 2).map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            className="p-4 rounded-xl border-2 border-green-500/20 bg-green-50/30 cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#202020] mb-1">{action.title}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-600 font-semibold">Resolved</span>
                  <span className="text-[#666666]">·</span>
                  <span className="text-[#666666]">
                    {action.completedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Impact */}
            {action.impact && (
              <div className="mt-2 p-2 rounded-lg bg-white border border-green-500/20">
                <p className="text-xs text-[#202020]">
                  <span className="font-semibold text-green-600">Impact:</span> {action.impact}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E07850] to-[#d96a3f] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          View All Actions
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
