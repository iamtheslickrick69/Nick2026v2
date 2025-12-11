"use client"

import { motion } from "framer-motion"
import { Plus, Calendar, FileText, Bell, AlertCircle, Clock } from "lucide-react"
import { useDashboardStore } from "@/lib/dashboardStore"

export default function QuickActionsBar() {
  const { unaddressedCriticalCount, actionsDueThisWeek, setActionEditorModal } = useDashboardStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 bg-[#F5F3F0] border-b border-[#E5E5E5] px-6 py-4"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Quick Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setActionEditorModal({})}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E07850] to-[#d96a3f] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            New Action
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#E5E5E5] bg-white text-[#202020] font-semibold text-sm hover:border-[#E07850]/30 transition-all"
          >
            <Calendar className="w-4 h-4" />
            Schedule 1:1
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#E5E5E5] bg-white text-[#202020] font-semibold text-sm hover:border-[#E07850]/30 transition-all"
          >
            <FileText className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>

        {/* Right: Alert Badges */}
        <div className="flex items-center gap-3">
          {/* Critical Items Badge */}
          {unaddressedCriticalCount > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="w-4 h-4 text-red-600" />
              </motion.div>
              <span className="text-sm font-semibold text-red-600">
                {unaddressedCriticalCount} Unaddressed Critical
              </span>
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{unaddressedCriticalCount}</span>
              </div>
            </motion.div>
          )}

          {/* Actions Due Badge */}
          {actionsDueThisWeek > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200"
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-600">
                {actionsDueThisWeek} Due This Week
              </span>
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{actionsDueThisWeek}</span>
              </div>
            </motion.div>
          )}

          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 rounded-lg hover:bg-white/50 text-[#666666] transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#F5F3F0]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
