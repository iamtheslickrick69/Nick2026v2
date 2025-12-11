"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Filter,
  Search,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react"

const actions = [
  {
    id: 1,
    title: "Address burnout concerns in Engineering",
    description: "3 team members reported feeling overwhelmed with Q4 deadlines",
    status: "in-progress",
    priority: "high",
    assignee: "Sarah Kim",
    team: "Engineering",
    created: "2 days ago",
    due: "Tomorrow",
    feedbackCount: 3,
  },
  {
    id: 2,
    title: "Schedule compensation review discussion",
    description: "Multiple signals about compensation clarity needed",
    status: "pending",
    priority: "medium",
    assignee: "Michael Rodriguez",
    team: "Sales",
    created: "5 days ago",
    due: "This week",
    feedbackCount: 5,
  },
  {
    id: 3,
    title: "Follow up on harassment report",
    description: "Sensitive matter requiring HR involvement",
    status: "in-progress",
    priority: "critical",
    assignee: "HR Team",
    team: "Sales",
    created: "1 day ago",
    due: "Today",
    feedbackCount: 1,
  },
  {
    id: 4,
    title: "Team celebration for Marketing milestone",
    description: "Positive feedback about recent campaign success",
    status: "completed",
    priority: "low",
    assignee: "Emily Chen",
    team: "Marketing",
    created: "3 days ago",
    due: "Completed",
    feedbackCount: 8,
  },
  {
    id: 5,
    title: "Clarify promotion criteria for Product team",
    description: "Multiple requests for clearer growth paths",
    status: "pending",
    priority: "medium",
    assignee: "David Park",
    team: "Product",
    created: "1 week ago",
    due: "Next week",
    feedbackCount: 4,
  },
]

const statusFilters = ["all", "pending", "in-progress", "completed"]
const priorityFilters = ["all", "critical", "high", "medium", "low"]

export default function ActionsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredActions = actions.filter((action) => {
    const matchesStatus = statusFilter === "all" || action.status === statusFilter
    const matchesPriority = priorityFilter === "all" || action.priority === priorityFilter
    const matchesSearch =
      action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.team.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "bg-emerald-50", text: "text-emerald-600", icon: CheckCircle }
      case "in-progress":
        return { bg: "bg-amber-50", text: "text-amber-600", icon: Clock }
      case "pending":
        return { bg: "bg-gray-100", text: "text-gray-600", icon: AlertCircle }
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", icon: AlertCircle }
    }
  }

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-red-100 text-red-600"
      case "medium":
        return "bg-amber-100 text-amber-600"
      case "low":
        return "bg-emerald-100 text-emerald-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const stats = {
    total: actions.length,
    pending: actions.filter((a) => a.status === "pending").length,
    inProgress: actions.filter((a) => a.status === "in-progress").length,
    completed: actions.filter((a) => a.status === "completed").length,
    critical: actions.filter((a) => a.priority === "critical").length,
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader title="Action Tracker" subtitle="Track every issue from identification to resolution" />

        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Total Actions", value: stats.total, color: "#1B7F8E" },
              { label: "Pending", value: stats.pending, color: "#666666" },
              { label: "In Progress", value: stats.inProgress, color: "#f59e0b" },
              { label: "Completed", value: stats.completed, color: "#10b981" },
              { label: "Critical", value: stats.critical, color: "#ef4444" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-[#E5E5E5]"
              >
                <p className="text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-sm text-[#666666]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E5E5]">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-sm outline-none transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[#666666]" />
                <span className="text-sm text-[#666666]">Status:</span>
                <div className="flex gap-1">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${
                        statusFilter === filter
                          ? "bg-[#E07850] text-white"
                          : "bg-[#F5F3F0] text-[#666666] hover:bg-[#ECEAE6]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#666666]">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-[#F5F3F0] border-none text-sm capitalize cursor-pointer outline-none"
                >
                  {priorityFilters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions List */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="divide-y divide-[#E5E5E5]">
              <AnimatePresence>
                {filteredActions.map((action, index) => {
                  const statusStyles = getStatusStyles(action.status)
                  return (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="p-5 hover:bg-[#F5F3F0]/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Status Icon */}
                        <div
                          className={`w-10 h-10 rounded-xl ${statusStyles.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <statusStyles.icon size={18} className={statusStyles.text} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-base font-medium text-[#202020]">{action.title}</h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityStyles(action.priority)}`}
                            >
                              {action.priority}
                            </span>
                          </div>
                          <p className="text-sm text-[#666666] mb-3">{action.description}</p>
                          <div className="flex items-center gap-4 text-xs text-[#9a9a9a]">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {action.assignee}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Due: {action.due}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare size={12} />
                              {action.feedbackCount} related
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#F5F3F0]">{action.team}</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight
                          size={18}
                          className="text-[#9a9a9a] group-hover:text-[#202020] group-hover:translate-x-1 transition-all flex-shrink-0"
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
