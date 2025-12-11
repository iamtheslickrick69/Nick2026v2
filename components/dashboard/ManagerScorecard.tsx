"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Star,
  MessageSquare,
} from "lucide-react"

const managers = [
  {
    id: 1,
    name: "Sarah Kim",
    role: "Engineering Manager",
    avatar: "SK",
    teamSize: 12,
    healthScore: 84,
    healthTrend: "up",
    responseTime: "4h",
    loopsClosed: 94,
    openIssues: 2,
    rank: 1,
    recentActions: [
      { action: "Addressed workload concern", time: "2h ago", status: "completed" },
      { action: "Scheduled team retrospective", time: "1d ago", status: "completed" },
    ],
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Sales Director",
    avatar: "MR",
    teamSize: 18,
    healthScore: 71,
    healthTrend: "down",
    responseTime: "12h",
    loopsClosed: 78,
    openIssues: 5,
    rank: 4,
    recentActions: [
      { action: "Compensation review pending", time: "2d ago", status: "pending" },
      { action: "1:1 scheduled", time: "3d ago", status: "in-progress" },
    ],
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Marketing Lead",
    avatar: "EC",
    teamSize: 8,
    healthScore: 91,
    healthTrend: "up",
    responseTime: "2h",
    loopsClosed: 98,
    openIssues: 0,
    rank: 1,
    recentActions: [
      { action: "Team celebration organized", time: "1d ago", status: "completed" },
      { action: "Growth path discussion", time: "3d ago", status: "completed" },
    ],
  },
  {
    id: 4,
    name: "David Park",
    role: "Product Manager",
    avatar: "DP",
    teamSize: 6,
    healthScore: 67,
    healthTrend: "down",
    responseTime: "24h",
    loopsClosed: 65,
    openIssues: 4,
    rank: 5,
    recentActions: [
      { action: "Burnout signals unaddressed", time: "5d ago", status: "overdue" },
      { action: "Team survey pending", time: "1w ago", status: "pending" },
    ],
  },
]

function ManagerScorecard() {
  const [expandedManager, setExpandedManager] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<"healthScore" | "loopsClosed" | "responseTime">("healthScore")

  const sortedManagers = [...managers].sort((a, b) => {
    if (sortBy === "healthScore") return b.healthScore - a.healthScore
    if (sortBy === "loopsClosed") return b.loopsClosed - a.loopsClosed
    return Number.parseInt(a.responseTime) - Number.parseInt(b.responseTime)
  })

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-emerald-50"
    if (score >= 70) return "bg-amber-50"
    return "bg-red-50"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={12} className="text-emerald-500" />
      case "in-progress":
        return <Clock size={12} className="text-amber-500" />
      case "pending":
        return <Clock size={12} className="text-[#666666]" />
      case "overdue":
        return <AlertTriangle size={12} className="text-red-500" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#202020]">Manager Accountability</h3>
            <p className="text-sm text-[#666666]">Track leadership responsiveness and loop closure rates</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#666666]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-9 px-3 rounded-xl bg-[#F5F3F0] border-none text-sm text-[#202020] cursor-pointer focus:ring-2 focus:ring-[#E07850]/30 outline-none"
            >
              <option value="healthScore">Team Health</option>
              <option value="loopsClosed">Loop Closure</option>
              <option value="responseTime">Response Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F5F3F0] text-xs font-medium text-[#666666] uppercase tracking-wider">
        <div className="col-span-3">Manager</div>
        <div className="col-span-2 text-center">Team Health</div>
        <div className="col-span-2 text-center">Response Time</div>
        <div className="col-span-2 text-center">Loops Closed</div>
        <div className="col-span-2 text-center">Open Issues</div>
        <div className="col-span-1" />
      </div>

      {/* Manager Rows */}
      <div className="divide-y divide-[#E5E5E5]">
        {sortedManagers.map((manager) => (
          <div key={manager.id}>
            <button
              onClick={() => setExpandedManager(expandedManager === manager.id ? null : manager.id)}
              className="w-full grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#F5F3F0]/50 transition-colors"
            >
              {/* Manager Info */}
              <div className="col-span-3 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                    manager.healthScore >= 85
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                      : manager.healthScore >= 70
                        ? "bg-gradient-to-br from-amber-400 to-amber-600"
                        : "bg-gradient-to-br from-red-400 to-red-600"
                  }`}
                >
                  {manager.avatar}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#202020]">{manager.name}</p>
                  <p className="text-xs text-[#666666]">
                    {manager.role} • {manager.teamSize} reports
                  </p>
                </div>
                {manager.rank === 1 && <Star size={14} className="text-amber-500 fill-amber-500" />}
              </div>

              {/* Team Health */}
              <div className="col-span-2 flex items-center justify-center gap-2">
                <span className={`text-lg font-semibold ${getScoreColor(manager.healthScore)}`}>
                  {manager.healthScore}
                </span>
                {manager.healthTrend === "up" ? (
                  <TrendingUp size={14} className="text-emerald-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
              </div>

              {/* Response Time */}
              <div className="col-span-2 text-center">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    Number.parseInt(manager.responseTime) <= 4
                      ? "bg-emerald-50 text-emerald-600"
                      : Number.parseInt(manager.responseTime) <= 12
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  <Clock size={12} />
                  {manager.responseTime}
                </span>
              </div>

              {/* Loops Closed */}
              <div className="col-span-2 flex items-center justify-center gap-2">
                <div className="w-16 h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      manager.loopsClosed >= 90
                        ? "bg-emerald-500"
                        : manager.loopsClosed >= 75
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${manager.loopsClosed}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-[#202020]">{manager.loopsClosed}%</span>
              </div>

              {/* Open Issues */}
              <div className="col-span-2 text-center">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    manager.openIssues === 0
                      ? "bg-emerald-50 text-emerald-600"
                      : manager.openIssues <= 2
                        ? "bg-amber-50 text-amber-600"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  {manager.openIssues === 0 ? <CheckCircle size={12} /> : <MessageSquare size={12} />}
                  {manager.openIssues}
                </span>
              </div>

              {/* Expand */}
              <div className="col-span-1 flex justify-end">
                <motion.div
                  animate={{ rotate: expandedManager === manager.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-[#666666]" />
                </motion.div>
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedManager === manager.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-[#F5F3F0]/50 border-t border-[#E5E5E5]">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Recent Actions */}
                      <div>
                        <h4 className="text-sm font-medium text-[#202020] mb-3">Recent Actions</h4>
                        <div className="space-y-2">
                          {manager.recentActions.map((action, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E5E5E5]"
                            >
                              {getStatusIcon(action.status)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-[#202020]">{action.action}</p>
                                <p className="text-xs text-[#9a9a9a]">{action.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div>
                        <h4 className="text-sm font-medium text-[#202020] mb-3">30-Day Performance</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-white rounded-xl border border-[#E5E5E5]">
                            <p className="text-xs text-[#666666]">Feedback Received</p>
                            <p className="text-lg font-semibold text-[#202020]">47</p>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-[#E5E5E5]">
                            <p className="text-xs text-[#666666]">Avg Sentiment</p>
                            <p className={`text-lg font-semibold ${getScoreColor(manager.healthScore)}`}>
                              {manager.healthScore >= 85
                                ? "Positive"
                                : manager.healthScore >= 70
                                  ? "Neutral"
                                  : "Negative"}
                            </p>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-[#E5E5E5]">
                            <p className="text-xs text-[#666666]">Team Participation</p>
                            <p className="text-lg font-semibold text-[#202020]">
                              {Math.round(manager.healthScore * 0.9)}%
                            </p>
                          </div>
                          <div className="p-3 bg-white rounded-xl border border-[#E5E5E5]">
                            <p className="text-xs text-[#666666]">Trust Trend</p>
                            <p
                              className={`text-lg font-semibold ${manager.healthTrend === "up" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {manager.healthTrend === "up" ? "Rising" : "Falling"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-end mt-4">
                      <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all">
                        View Full Profile
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ManagerScorecard
