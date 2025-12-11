"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, MessageSquare, AlertTriangle, CheckCircle, Users, User, ArrowRight } from "lucide-react"
import { useDashboardStore } from "@/lib/dashboardStore"
import { recentFeedback, riskAlerts, actionItems } from "@/lib/dashboardData"

export default function GlobalSearch() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, setFeedbackDetailPanel } = useDashboardStore()
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Search across all data
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    const results: any[] = []

    // Search feedback
    recentFeedback.forEach((item) => {
      if (
        item.message.toLowerCase().includes(query) ||
        item.department?.toLowerCase().includes(query) ||
        item.segment?.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      ) {
        results.push({
          type: "feedback",
          id: item.id,
          title: item.message.substring(0, 80) + (item.message.length > 80 ? "..." : ""),
          subtitle: `${item.source === "employee" ? "Employee" : "Customer"} • ${item.department || item.segment}`,
          icon: item.source === "employee" ? Users : User,
          iconColor: item.source === "employee" ? "from-emerald-500 to-emerald-600" : "from-purple-500 to-purple-600",
          data: item,
        })
      }
    })

    // Search risks
    riskAlerts.forEach((risk) => {
      if (
        risk.title.toLowerCase().includes(query) ||
        risk.description.toLowerCase().includes(query) ||
        risk.signals.some((signal) => signal.toLowerCase().includes(query))
      ) {
        results.push({
          type: "risk",
          id: risk.id,
          title: risk.title,
          subtitle: `${risk.severity.toUpperCase()} Risk • Detected ${risk.detectedDate.toLocaleDateString()}`,
          icon: AlertTriangle,
          iconColor: risk.severity === "critical" ? "from-red-500 to-red-600" : "from-yellow-500 to-yellow-600",
          data: risk,
        })
      }
    })

    // Search actions
    actionItems.forEach((action) => {
      if (action.title.toLowerCase().includes(query) || action.owner.toLowerCase().includes(query)) {
        results.push({
          type: "action",
          id: action.id,
          title: action.title,
          subtitle: `${action.status.replace("_", " ").toUpperCase()} • ${action.owner} • Due ${action.dueDate.toLocaleDateString()}`,
          icon: CheckCircle,
          iconColor: action.status === "completed" ? "from-green-500 to-green-600" : "from-blue-500 to-blue-600",
          data: action,
        })
      }
    })

    return results.slice(0, 8) // Limit to 8 results
  }, [searchQuery])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }

      // Escape to close
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false)
        setSearchQuery("")
      }

      // Arrow navigation
      if (searchOpen && searchResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % searchResults.length)
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length)
        }
        if (e.key === "Enter") {
          e.preventDefault()
          handleSelectResult(searchResults[selectedIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen, searchResults, selectedIndex, setSearchOpen, setSearchQuery])

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  const handleSelectResult = (result: any) => {
    if (result.type === "feedback") {
      setFeedbackDetailPanel({
        id: result.data.id,
        source: result.data.source,
        department: result.data.department,
        segment: result.data.segment,
        message: result.data.message,
        sentiment: result.data.sentiment,
        priority: result.data.priority,
        timestamp: result.data.timestamp,
        anonymityLevel: result.data.anonymityLevel,
        tags: result.data.tags,
      })
      setSearchOpen(false)
      setSearchQuery("")
    }
    // TODO: Handle risk and action clicks
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSearchOpen(false)
              setSearchQuery("")
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl mx-4"
            >
              {/* Search Box */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Input */}
                <div className="flex items-center gap-3 p-4 border-b border-[#E5E5E5]">
                  <Search className="w-5 h-5 text-[#666666]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search feedback, risks, actions..."
                    autoFocus
                    className="flex-1 text-base text-[#202020] placeholder:text-[#9a9a9a] outline-none bg-transparent"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery("")
                    }}
                    className="p-1.5 rounded-lg hover:bg-[#F5F3F0] text-[#666666] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Results */}
                {searchQuery.trim() ? (
                  <div className="max-h-[400px] overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map((result, index) => {
                          const Icon = result.icon
                          const isSelected = index === selectedIndex
                          return (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                              onClick={() => handleSelectResult(result)}
                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                                isSelected ? "bg-blue-50 border-2 border-blue-400" : "hover:bg-[#F5F3F0] border-2 border-transparent"
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${result.iconColor} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#202020] truncate">{result.title}</p>
                                <p className="text-xs text-[#666666] truncate">{result.subtitle}</p>
                              </div>
                              {isSelected && (
                                <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                                  <span>↵</span>
                                </div>
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#F5F3F0] flex items-center justify-center mx-auto mb-4">
                          <Search className="w-8 h-8 text-[#9a9a9a]" />
                        </div>
                        <h4 className="text-base font-semibold text-[#202020] mb-2">No results found</h4>
                        <p className="text-sm text-[#666666]">Try searching for feedback keywords, departments, or risk alerts</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-2">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-medium text-[#666666]">Employee Feedback</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-2">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-medium text-[#666666]">Customer Feedback</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-2">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs font-medium text-[#666666]">Risk Alerts</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#666666]">
                        Try searching for <span className="font-semibold text-[#202020]">burnout</span>,{" "}
                        <span className="font-semibold text-[#202020]">engineering</span>, or{" "}
                        <span className="font-semibold text-[#202020]">compensation</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="px-4 py-3 border-t border-[#E5E5E5] bg-[#F5F3F0] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[#666666]">
                    <div className="flex items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-white border border-[#E5E5E5] font-mono text-[10px]">↑↓</kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-white border border-[#E5E5E5] font-mono text-[10px]">↵</kbd>
                      <span>Select</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-2 py-1 rounded bg-white border border-[#E5E5E5] font-mono text-[10px]">Esc</kbd>
                      <span>Close</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#666666]">
                    <kbd className="px-2 py-1 rounded bg-white border border-[#E5E5E5] font-mono text-[10px]">⌘K</kbd> to open
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
