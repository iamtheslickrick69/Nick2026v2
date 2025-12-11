"use client"

import { motion } from "framer-motion"
import { MessageSquare, Users, User, AlertCircle, ArrowRight } from "lucide-react"
import { recentFeedback, getRelativeTime, getSentimentEmoji } from "@/lib/dashboardData"

export default function RealTimeFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border-2 border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#202020]">Real-Time Feed</h3>
              <p className="text-xs text-[#666666]">Live feedback from all channels</p>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
        </div>
      </div>

      {/* Feed Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[600px]">
        {recentFeedback.map((item, index) => {
          const isEmployee = item.source === "employee"
          const sourceIcon = isEmployee ? Users : User
          const sourceColor = isEmployee ? "from-emerald-500 to-emerald-600" : "from-purple-500 to-purple-600"
          const priorityStyles =
            item.priority === "critical"
              ? "border-red-500/30 bg-red-50/50"
              : item.priority === "concern"
                ? "border-yellow-500/30 bg-yellow-50/50"
                : "border-gray-200 bg-white"

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              className={`p-4 rounded-xl border-2 ${priorityStyles} cursor-pointer transition-all`}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {/* Source Icon */}
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${sourceColor} flex items-center justify-center flex-shrink-0`}>
                    {isEmployee ? <Users className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                  </div>

                  {/* Source Label */}
                  <span className="text-xs font-semibold text-[#202020]">
                    {isEmployee ? "Employee" : "Customer"}
                  </span>

                  {/* Department/Segment */}
                  {(item.department || item.segment) && (
                    <>
                      <span className="text-xs text-[#666666]">·</span>
                      <span className="text-xs text-[#666666]">{item.department || item.segment}</span>
                    </>
                  )}
                </div>

                {/* Timestamp & Sentiment */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getSentimentEmoji(item.sentiment)}</span>
                  <span className="text-xs text-[#666666]">{getRelativeTime(item.timestamp)}</span>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm text-[#202020] leading-relaxed mb-3">{item.message}</p>

              {/* Footer Row */}
              <div className="flex items-center justify-between">
                {/* Priority Badge */}
                <div className="flex items-center gap-2">
                  {item.priority === "critical" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                      <AlertCircle className="w-3 h-3 text-red-600" />
                      <span className="text-xs font-semibold text-red-600">Critical</span>
                    </span>
                  )}
                  {item.priority === "concern" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                      <AlertCircle className="w-3 h-3 text-yellow-600" />
                      <span className="text-xs font-semibold text-yellow-600">Concern</span>
                    </span>
                  )}
                  {item.priority === "general" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20">
                      <span className="text-xs font-semibold text-gray-600">General</span>
                    </span>
                  )}
                </div>

                {/* Anonymity Level */}
                <span className="text-xs text-[#666666] font-medium capitalize">{item.anonymityLevel.replace("_", " ")}</span>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-[#F5F3F0] text-[10px] text-[#666666] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#E5E5E5]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          View All Feedback
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
