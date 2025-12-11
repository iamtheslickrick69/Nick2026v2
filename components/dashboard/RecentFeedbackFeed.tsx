"use client"

import { motion } from "framer-motion"
import { MessageSquare, ChevronRight } from "lucide-react"

const feedbackItems = [
  {
    id: 1,
    preview: "Feeling overwhelmed with the Q4 deadline pressure...",
    sentiment: "negative",
    team: "Engineering",
    time: "12m ago",
  },
  {
    id: 2,
    preview: "Really appreciated the team lunch yesterday!",
    sentiment: "positive",
    team: "Marketing",
    time: "45m ago",
  },
  {
    id: 3,
    preview: "Would love more clarity on promotion criteria...",
    sentiment: "neutral",
    team: "Sales",
    time: "2h ago",
  },
]

function RecentFeedbackFeed() {
  const getSentimentDot = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-500"
      case "negative":
        return "bg-red-500"
      default:
        return "bg-amber-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={16} className="text-[#E07850]" />
        <h3 className="text-base font-semibold text-[#202020]">Recent Feedback</h3>
      </div>

      {/* Feed Items */}
      <div className="space-y-3">
        {feedbackItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="p-3 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-2">
              <span className={`w-2 h-2 rounded-full ${getSentimentDot(item.sentiment)} mt-1.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#202020] line-clamp-2">{item.preview}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-[#666666]">{item.team}</span>
                  <span className="text-xs text-[#9a9a9a]">•</span>
                  <span className="text-xs text-[#9a9a9a]">{item.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-3 py-2.5 rounded-xl border border-[#E5E5E5] hover:border-[#E07850]/30 text-sm font-medium text-[#666666] hover:text-[#202020] flex items-center justify-center gap-1 transition-all group">
        View All Feedback
        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.div>
  )
}

export default RecentFeedbackFeed
