"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import CulturePulse from "@/components/dashboard/CulturePulse"
import DailyDigest from "@/components/dashboard/DailyDigest"
import RealTimeFeedEnhanced from "@/components/dashboard/RealTimeFeedEnhanced"
import RiskRadarCard from "@/components/dashboard/RiskRadarCard"
import ActionTrackerFull from "@/components/dashboard/ActionTrackerFull"
import HealthBreakdownEnhanced from "@/components/dashboard/HealthBreakdownEnhanced"
import QuickActionsBar from "@/components/dashboard/QuickActionsBar"
import FeedbackDetailPanel from "@/components/dashboard/FeedbackDetailPanel"
import GlobalSearch from "@/components/dashboard/GlobalSearch"
import TrendAnalysisModal from "@/components/dashboard/TrendAnalysisModal"
import ActionEditorModal from "@/components/dashboard/ActionEditorModal"
import KeyboardShortcutsOverlay from "@/components/dashboard/KeyboardShortcutsOverlay"
import AIChatbot from "@/components/dashboard/AIChatbot"
import { useDashboardStore } from "@/lib/dashboardStore"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { selectedDepartment, setSelectedDepartment } = useDashboardStore()

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen"
        style={{ marginLeft: 260 }}
      >
        <DashboardHeader
          title="Dashboard"
          subtitle="Welcome back, John. Your organizational nervous system in real-time."
        />

        {/* Quick Actions Bar */}
        <QuickActionsBar />

        {/* Active Filter Badge */}
        <AnimatePresence>
          {selectedDepartment && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-6 mt-4 px-4 py-3 rounded-xl bg-blue-50 border-2 border-blue-400 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-semibold text-blue-900">
                  Filtered to: <span className="font-bold">{selectedDepartment}</span>
                </span>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  Cross-component filtering active
                </span>
              </div>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Clear Filter
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-6 space-y-6">
          {/* Top Row: Culture Pulse + Daily Digest */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CulturePulse />
            <DailyDigest />
          </div>

          {/* Middle Row: Real-Time Feed + Risk Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RealTimeFeedEnhanced />
            <RiskRadarCard />
          </div>

          {/* Bottom Row: Action Tracker + Health Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActionTrackerFull />
            <HealthBreakdownEnhanced />
          </div>
        </div>
      </motion.main>

      {/* Feedback Detail Panel (Global) */}
      <FeedbackDetailPanel />

      {/* Global Search (Cmd+K) */}
      <GlobalSearch />

      {/* Trend Analysis Modal */}
      <TrendAnalysisModal />

      {/* Action Editor Modal */}
      <ActionEditorModal />

      {/* Keyboard Shortcuts Overlay */}
      <KeyboardShortcutsOverlay />

      {/* AI Chatbot (Floating) */}
      <AIChatbot />
    </div>
  )
}
