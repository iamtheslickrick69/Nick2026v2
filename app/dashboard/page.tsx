"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import CulturePulse from "@/components/dashboard/CulturePulse"
import DailyDigest from "@/components/dashboard/DailyDigest"
import RealTimeFeed from "@/components/dashboard/RealTimeFeed"
import RiskRadarCard from "@/components/dashboard/RiskRadarCard"
import ActionTrackerFull from "@/components/dashboard/ActionTrackerFull"
import HealthBreakdown from "@/components/dashboard/HealthBreakdown"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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

        <div className="p-6 space-y-6">
          {/* Top Row: Culture Pulse + Daily Digest */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CulturePulse />
            <DailyDigest />
          </div>

          {/* Middle Row: Real-Time Feed + Risk Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RealTimeFeed />
            <RiskRadarCard />
          </div>

          {/* Bottom Row: Action Tracker + Health Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActionTrackerFull />
            <HealthBreakdown />
          </div>
        </div>
      </motion.main>
    </div>
  )
}
