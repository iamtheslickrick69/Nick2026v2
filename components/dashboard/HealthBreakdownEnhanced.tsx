"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, BarChart3, Users, User, ArrowRight } from "lucide-react"
import { departmentHealth, customerSegmentHealth } from "@/lib/dashboardData"
import { useDashboardStore } from "@/lib/dashboardStore"

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3.5 h-3.5 text-green-600" />
    case "down":
      return <TrendingDown className="w-3.5 h-3.5 text-red-600" />
    default:
      return <Minus className="w-3.5 h-3.5 text-gray-600" />
  }
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "from-green-500 to-green-600"
  if (score >= 70) return "from-teal-500 to-teal-600"
  if (score >= 60) return "from-yellow-500 to-yellow-600"
  return "from-red-500 to-red-600"
}

export default function HealthBreakdownEnhanced() {
  const { selectedDepartment, setSelectedDepartment } = useDashboardStore()

  const handleDepartmentClick = (deptName: string) => {
    if (selectedDepartment === deptName) {
      setSelectedDepartment(null) // Deselect if already selected
    } else {
      setSelectedDepartment(deptName)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B7F8E] to-[#06b6d4] flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#202020]">Health Breakdown</h3>
            <p className="text-xs text-[#666666]">Click any department to filter dashboard</p>
          </div>
        </div>
      </div>

      {/* Department Health */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-[#666666]" />
          <h4 className="text-sm font-semibold text-[#202020]">Employee Departments</h4>
        </div>

        <div className="space-y-3">
          {departmentHealth.map((dept, index) => {
            const isSelected = selectedDepartment === dept.name
            return (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleDepartmentClick(dept.name)}
                className={`cursor-pointer p-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-blue-50 border-2 border-blue-400 ring-2 ring-blue-100"
                    : "hover:bg-[#F5F3F0] border-2 border-transparent"
                }`}
              >
                {/* Department Name & Score */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#202020]">{dept.name}</span>
                    <span className="text-xs text-[#666666]">({dept.employeeCount})</span>
                    {isSelected && (
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        FILTERING
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(dept.trend)}
                    <span className="text-sm font-bold text-[#202020]">{dept.score}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 bg-[#F5F3F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.score}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.05, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${getScoreColor(dept.score)} rounded-full`}
                  />
                </div>

                {/* Top Concerns */}
                {dept.topConcerns && dept.topConcerns.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {dept.topConcerns.slice(0, 2).map((concern, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-[#F5F3F0] text-[10px] text-[#666666] font-medium"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Customer Segment Health */}
      <div className="pt-6 border-t border-[#E5E5E5]">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-[#666666]" />
          <h4 className="text-sm font-semibold text-[#202020]">Customer Segments</h4>
        </div>

        <div className="space-y-3">
          {customerSegmentHealth.map((segment, index) => {
            const isSelected = selectedDepartment === segment.name
            return (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleDepartmentClick(segment.name)}
                className={`cursor-pointer p-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-blue-50 border-2 border-blue-400 ring-2 ring-blue-100"
                    : "hover:bg-[#F5F3F0] border-2 border-transparent"
                }`}
              >
                {/* Segment Name & Score */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#202020]">{segment.name}</span>
                    <span className="text-xs text-[#666666]">({segment.customerCount})</span>
                    {segment.churnRisk !== "low" && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          segment.churnRisk === "high"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        {segment.churnRisk === "high" ? "High Risk" : "Med Risk"}
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        FILTERING
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(segment.trend)}
                    <span className="text-sm font-bold text-[#202020]">{segment.score}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 bg-[#F5F3F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.score}%` }}
                    transition={{ duration: 1, delay: 1.0 + index * 0.05, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${getScoreColor(segment.score)} rounded-full`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#E5E5E5] bg-white text-[#202020] font-semibold text-sm hover:border-[#14b8a6]/30 transition-all"
        >
          View Detailed Reports
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
