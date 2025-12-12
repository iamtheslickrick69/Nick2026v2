"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Users, User, Smile, Meh, Frown, AlertCircle, ChevronDown, X } from "lucide-react"
import { useDashboardStore } from "@/lib/dashboardStore"
import { departmentHealth, customerSegmentHealth } from "@/lib/dashboardData"

export default function FeedFilterBar() {
  const {
    feedFilters,
    setFeedSource,
    setFeedSentiment,
    setFeedPriority,
    setFeedDepartments,
    setFeedSegments,
    setFeedTimeRange,
    resetFeedFilters,
    selectedDepartment,
  } = useDashboardStore()

  const hasActiveFilters =
    feedFilters.source !== "all" ||
    feedFilters.sentiment !== "all" ||
    feedFilters.priority !== "all" ||
    feedFilters.departments.length > 0 ||
    feedFilters.segments.length > 0 ||
    selectedDepartment !== null

  // Count active filters for badge
  const activeFilterCount =
    (feedFilters.source !== "all" ? 1 : 0) +
    (feedFilters.sentiment !== "all" ? 1 : 0) +
    (feedFilters.priority !== "all" ? 1 : 0) +
    feedFilters.departments.length +
    feedFilters.segments.length +
    (selectedDepartment ? 1 : 0)

  return (
    <div className="space-y-3">
      {/* Source Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#666666] mr-2">SOURCE:</span>
        <FilterChip
          active={feedFilters.source === "all"}
          onClick={() => setFeedSource("all")}
          icon={null}
          label="All"
        />
        <FilterChip
          active={feedFilters.source === "employee"}
          onClick={() => setFeedSource("employee")}
          icon={<Users className="w-3 h-3" />}
          label="Employees"
          gradient="from-emerald-500 to-emerald-600"
        />
        <FilterChip
          active={feedFilters.source === "customer"}
          onClick={() => setFeedSource("customer")}
          icon={<User className="w-3 h-3" />}
          label="Customers"
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Sentiment Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#666666] mr-2">SENTIMENT:</span>
        <FilterChip
          active={feedFilters.sentiment === "all"}
          onClick={() => setFeedSentiment("all")}
          icon={null}
          label="All"
        />
        <FilterChip
          active={feedFilters.sentiment === "positive"}
          onClick={() => setFeedSentiment("positive")}
          icon={<Smile className="w-3 h-3" />}
          label="Positive"
          color="text-green-600"
          bgColor="bg-green-50"
          borderColor="border-green-200"
        />
        <FilterChip
          active={feedFilters.sentiment === "neutral"}
          onClick={() => setFeedSentiment("neutral")}
          icon={<Meh className="w-3 h-3" />}
          label="Neutral"
          color="text-gray-600"
          bgColor="bg-gray-50"
          borderColor="border-gray-200"
        />
        <FilterChip
          active={feedFilters.sentiment === "negative"}
          onClick={() => setFeedSentiment("negative")}
          icon={<Frown className="w-3 h-3" />}
          label="Negative"
          color="text-red-600"
          bgColor="bg-red-50"
          borderColor="border-red-200"
        />
      </div>

      {/* Priority Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#666666] mr-2">PRIORITY:</span>
        <FilterChip
          active={feedFilters.priority === "all"}
          onClick={() => setFeedPriority("all")}
          icon={null}
          label="All"
        />
        <FilterChip
          active={feedFilters.priority === "critical"}
          onClick={() => setFeedPriority("critical")}
          icon={<span className="text-xs">🔴</span>}
          label="Critical"
          color="text-red-600"
          bgColor="bg-red-50"
          borderColor="border-red-200"
        />
        <FilterChip
          active={feedFilters.priority === "concern"}
          onClick={() => setFeedPriority("concern")}
          icon={<span className="text-xs">🟡</span>}
          label="Concerns"
          color="text-yellow-600"
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
        />
        <FilterChip
          active={feedFilters.priority === "general"}
          onClick={() => setFeedPriority("general")}
          icon={null}
          label="General"
        />
      </div>

      {/* Time Range */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#666666] mr-2">TIME:</span>
        <FilterChip
          active={feedFilters.timeRange === "1h"}
          onClick={() => setFeedTimeRange("1h")}
          icon={null}
          label="Last Hour"
        />
        <FilterChip
          active={feedFilters.timeRange === "today"}
          onClick={() => setFeedTimeRange("today")}
          icon={null}
          label="Today"
        />
        <FilterChip
          active={feedFilters.timeRange === "7d"}
          onClick={() => setFeedTimeRange("7d")}
          icon={null}
          label="Last 7 Days"
        />
        <FilterChip
          active={feedFilters.timeRange === "30d"}
          onClick={() => setFeedTimeRange("30d")}
          icon={null}
          label="Last 30 Days"
        />
      </div>

      {/* Clear Filters Button */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={resetFeedFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6] font-semibold text-sm hover:bg-[#14b8a6]/20 transition-all"
          >
            <X className="w-4 h-4" />
            Clear All Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[#14b8a6] text-white text-xs">
                {activeFilterCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// Filter Chip Component
interface FilterChipProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  gradient?: string
  color?: string
  bgColor?: string
  borderColor?: string
}

function FilterChip({ active, onClick, icon, label, gradient, color, bgColor, borderColor }: FilterChipProps) {
  const defaultColor = "text-[#666666]"
  const defaultBgColor = "bg-white"
  const defaultBorderColor = "border-[#E5E5E5]"

  const activeStyles = gradient
    ? `bg-gradient-to-r ${gradient} text-white border-transparent`
    : `${bgColor || "bg-[#1B7F8E]"} ${color || "text-white"} border-transparent`

  const inactiveStyles = `${defaultBgColor} ${defaultColor} ${defaultBorderColor} hover:border-[#14b8a6]/30`

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-medium transition-all ${
        active ? activeStyles : inactiveStyles
      }`}
    >
      {icon}
      {label}
    </motion.button>
  )
}
