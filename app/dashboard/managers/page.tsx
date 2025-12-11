"use client"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import ManagerScorecard from "@/components/dashboard/ManagerScorecard"
import { Users, Clock, CheckCircle, Award, AlertTriangle } from "lucide-react"

const summaryStats = [
  {
    label: "Total Managers",
    value: "24",
    icon: Users,
    color: "#1B7F8E",
  },
  {
    label: "Avg Response Time",
    value: "8h",
    icon: Clock,
    change: "-2h",
    color: "#06b6d4",
  },
  {
    label: "Avg Loop Closure",
    value: "84%",
    icon: CheckCircle,
    change: "+6%",
    color: "#10b981",
  },
  {
    label: "Top Performers",
    value: "6",
    icon: Award,
    color: "#E07850",
  },
  {
    label: "Needs Attention",
    value: "3",
    icon: AlertTriangle,
    color: "#f59e0b",
  },
]

export default function ManagersPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader
          title="Manager Scorecard"
          subtitle="Track leadership responsiveness and accountability across your organization"
        />

        <div className="p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {summaryStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={20} style={{ color: stat.color }} />
                  </div>
                  {stat.change && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-[#202020]">{stat.value}</p>
                <p className="text-sm text-[#666666]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Scorecard */}
          <ManagerScorecard />
        </div>
      </main>
    </div>
  )
}
