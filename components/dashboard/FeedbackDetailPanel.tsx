"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Users, User, Clock, Shield, Tag, AlertCircle, ChevronRight, UserPlus, Flag } from "lucide-react"
import { useDashboardStore } from "@/lib/dashboardStore"
import { getSentimentEmoji, getRelativeTime } from "@/lib/dashboardData"

export default function FeedbackDetailPanel() {
  const { feedbackDetailPanel, setFeedbackDetailPanel } = useDashboardStore()

  if (!feedbackDetailPanel) return null

  const isEmployee = feedbackDetailPanel.source === "employee"
  const sourceColor = isEmployee ? "from-emerald-500 to-emerald-600" : "from-purple-500 to-purple-600"

  const handleClose = () => setFeedbackDetailPanel(null)

  // Suggested actions from Coro AI (mock data based on message content)
  const suggestedActions = getSuggestedActions(feedbackDetailPanel)

  return (
    <AnimatePresence>
      {feedbackDetailPanel && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E5E5] p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sourceColor} flex items-center justify-center`}>
                    {isEmployee ? <Users className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#202020]">
                      {isEmployee ? "Employee" : "Customer"} Feedback
                    </h3>
                    <p className="text-sm text-[#666666]">
                      {feedbackDetailPanel.department || feedbackDetailPanel.segment}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-[#F5F3F0] text-[#666666] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metadata Row */}
              <div className="flex items-center gap-4 text-xs text-[#666666]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getRelativeTime(feedbackDetailPanel.timestamp)}
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span className="capitalize">{feedbackDetailPanel.anonymityLevel.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Sentiment & Priority */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F5F3F0]">
                  <span className="text-2xl">{getSentimentEmoji(feedbackDetailPanel.sentiment)}</span>
                  <span className="text-sm font-medium text-[#202020] capitalize">{feedbackDetailPanel.sentiment}</span>
                </div>

                {feedbackDetailPanel.priority === "critical" && (
                  <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-50 border border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-600">Critical</span>
                  </div>
                )}
                {feedbackDetailPanel.priority === "concern" && (
                  <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-yellow-50 border border-yellow-200">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-600">Concern</span>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="p-4 rounded-xl bg-[#F5F3F0] border border-[#E5E5E5]">
                <p className="text-base text-[#202020] leading-relaxed">{feedbackDetailPanel.message}</p>
              </div>

              {/* Tags */}
              {feedbackDetailPanel.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-[#666666]" />
                    <span className="text-xs font-semibold text-[#666666]">TAGS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {feedbackDetailPanel.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-xs text-[#666666] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Coro AI Suggested Actions */}
              <div className="border-t border-[#E5E5E5] pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{
                      background: "conic-gradient(from 0deg, #E07850, #1B7F8E, #06b6d4, #E07850)",
                    }}
                  >
                    <div className="absolute w-5 h-5 bg-white rounded-md" />
                    <span className="relative text-xs">✨</span>
                  </div>
                  <span className="text-sm font-semibold text-[#202020]">Coro's Suggested Actions</span>
                </div>

                <div className="space-y-2">
                  {suggestedActions.map((action, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#E07850]/30 cursor-pointer transition-all group"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#F5F3F0] flex items-center justify-center text-xs font-medium text-[#666666]">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-sm text-[#202020]">{action}</span>
                      <ChevronRight className="w-4 h-4 text-[#9a9a9a] group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-[#E5E5E5] pt-6 space-y-3">
                <h4 className="text-sm font-semibold text-[#202020] mb-3">Quick Actions</h4>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#E07850] to-[#d96a3f] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Assign to Manager
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#E5E5E5] bg-white text-[#202020] font-semibold text-sm hover:border-[#E07850]/30 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                  Create Action Item
                </motion.button>

                {feedbackDetailPanel.priority === "critical" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-600 font-semibold text-sm hover:border-red-300 transition-all"
                  >
                    <Flag className="w-4 h-4" />
                    Escalate to HR
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Helper function to generate suggested actions based on feedback content
function getSuggestedActions(feedback: any): string[] {
  const message = feedback.message.toLowerCase()

  if (message.includes("burnout") || message.includes("overwork") || message.includes("deadline")) {
    return [
      "Schedule 1:1 with affected employee to discuss workload",
      "Review project timeline and resource allocation",
      "Consider redistributing tasks across team members",
    ]
  }

  if (message.includes("harassment") || message.includes("hostile") || message.includes("inappropriate")) {
    return [
      "Escalate to HR for immediate investigation",
      "Document this feedback securely for legal review",
      "Implement interim protective measures if necessary",
    ]
  }

  if (message.includes("compensation") || message.includes("pay") || message.includes("salary")) {
    return [
      "Benchmark current compensation against market rates",
      "Schedule compensation review with leadership",
      "Prepare retention package if high performer",
    ]
  }

  if (message.includes("churn") || message.includes("cancel") || message.includes("switch")) {
    return [
      "Reach out to customer success team immediately",
      "Offer executive escalation call within 24 hours",
      "Review product usage data for pain points",
    ]
  }

  // Default suggestions
  return [
    "Acknowledge receipt and thank for feedback",
    "Assign to relevant team lead for review",
    "Follow up within 48 hours with action plan",
  ]
}
