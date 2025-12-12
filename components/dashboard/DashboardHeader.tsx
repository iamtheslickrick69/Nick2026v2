"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, ChevronDown, Calendar, RefreshCw, Sparkles } from "lucide-react"
import { useCoro } from "@/contexts/CoroContext"

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { openChat } = useCoro()

  const notifications = [
    { id: 1, type: "alert", message: "3 new risk signals detected", time: "2m ago", urgent: true },
    {
      id: 2,
      type: "insight",
      message: "Coro identified a burnout pattern in Engineering",
      time: "1h ago",
      urgent: false,
    },
    { id: 3, type: "action", message: "Manager response required for 2 items", time: "3h ago", urgent: true },
  ]

  const urgentCount = notifications.filter((n) => n.urgent).length

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-[#E5E5E5] sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Title & Subtitle */}
        <div>
          <h1 className="text-xl font-semibold text-[#202020]">{title}</h1>
          {subtitle && <p className="text-sm text-[#666666]">{subtitle}</p>}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <motion.div
            animate={{ width: searchFocused ? 280 : 200 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#14b8a6]/30 focus:bg-white text-sm text-[#202020] placeholder:text-[#9a9a9a] outline-none transition-all"
            />
          </motion.div>

          {/* Date Range Selector */}
          <button className="h-9 px-3 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] flex items-center gap-2 text-sm text-[#666666] transition-colors">
            <Calendar size={14} />
            <span>Last 30 days</span>
            <ChevronDown size={14} />
          </button>

          {/* Refresh */}
          <button className="h-9 w-9 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] flex items-center justify-center text-[#666666] transition-colors">
            <RefreshCw size={16} />
          </button>

          {/* AI Quick Action */}
          <button
            onClick={openChat}
            className="h-9 px-4 rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#C9643D] hover:from-[#d06840] hover:to-[#b9542d] text-white text-sm font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
          >
            <Sparkles size={14} />
            <span>Ask Coro</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-9 w-9 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] flex items-center justify-center text-[#666666] transition-colors relative"
            >
              <Bell size={16} />
              {urgentCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">
                  {urgentCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E5E5] overflow-hidden"
                >
                  <div className="p-4 border-b border-[#E5E5E5]">
                    <h3 className="text-sm font-semibold text-[#202020]">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b border-[#E5E5E5] last:border-b-0 hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.urgent ? "bg-red-500" : "bg-[#1B7F8E]"}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#202020]">{notif.message}</p>
                            <p className="text-xs text-[#9a9a9a] mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[#E5E5E5] bg-[#F5F3F0]">
                    <button className="w-full text-sm text-[#14b8a6] font-medium hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
