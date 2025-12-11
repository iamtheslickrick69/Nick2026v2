"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import CultureHealthScore from "@/components/dashboard/CultureHealthScore"
import CoroInsightsCard from "@/components/dashboard/CoroInsightsCard"
import RiskRadarCard from "@/components/dashboard/RiskRadarCard"
import QuickStatsRow from "@/components/dashboard/QuickStatsRow"
import ManagerScorecard from "@/components/dashboard/ManagerScorecard"
import RecentFeedbackFeed from "@/components/dashboard/RecentFeedbackFeed"
import ActionTrackerMini from "@/components/dashboard/ActionTrackerMini"

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
        <DashboardHeader title="Dashboard" subtitle="Welcome back, John. Here's your organization's pulse." />

        <div className="p-6 space-y-6">
          {/* Tier 1: Instant Glance - Hero Metrics */}
          <QuickStatsRow />

          {/* Tier 2: Situational Awareness - Main Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Health Score + Risk Radar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <CultureHealthScore />
              <RiskRadarCard />
            </div>

            {/* Center Column: Coro Insights */}
            <div className="col-span-12 lg:col-span-5">
              <CoroInsightsCard />
            </div>

            {/* Right Column: Action Tracker + Recent Activity */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <ActionTrackerMini />
              <RecentFeedbackFeed />
            </div>
          </div>

          {/* Tier 3: Exploration - Manager Accountability */}
          <ManagerScorecard />
        </div>
      </motion.main>
    </div>
  )
}
