"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  MessageSquare,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  TrendingUp,
  Target,
  FileText,
  Sparkles,
  Menu,
  X,
} from "lucide-react"

const navItems = [
  {
    section: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Coro Insights", href: "/dashboard/insights", icon: MessageSquare },
      { name: "Coro Analytics", href: "/dashboard/coro-analytics", icon: Sparkles },
    ],
  },
  {
    section: "Analytics",
    items: [
      { name: "Culture Health", href: "/dashboard/health", icon: TrendingUp },
      { name: "Risk Radar", href: "/dashboard/risks", icon: Target },
      { name: "Trends", href: "/dashboard/trends", icon: BarChart3 },
    ],
  },
  {
    section: "Management",
    items: [
      { name: "Manager Scorecard", href: "/dashboard/managers", icon: Users },
      { name: "Action Tracker", href: "/dashboard/actions", icon: FileText },
      { name: "Security", href: "/dashboard/security", icon: Shield },
    ],
  },
]

const bottomItems = [
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-[#E5E5E5] shadow-lg"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 80 : 260,
          x: mobileOpen ? 0 : -260,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-[#E5E5E5] flex flex-col z-40 lg:translate-x-0"
      >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E5E5]">
        <Link href="/" className="flex items-center gap-3">
          {/* Animated Gradient Orb */}
          <motion.div
            className="w-9 h-9 rounded-full relative overflow-hidden flex-shrink-0"
            style={{
              background: "conic-gradient(from 0deg, #E07850, #1B7F8E, #06b6d4, #E07850)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute inset-1 bg-white rounded-full" />
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: "conic-gradient(from 180deg, #E07850, #1B7F8E, #06b6d4, #E07850)",
              }}
            />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-semibold text-[#202020]"
              >
                LoopSync
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-[#F5F3F0] transition-colors text-[#666666]"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((group) => (
          <div key={group.section} className="mb-6">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium text-[#9a9a9a] uppercase tracking-wider px-3 mb-2"
                >
                  {group.section}
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-[#E07850]/10 to-[#1B7F8E]/10 text-[#E07850] font-medium"
                            : "text-[#666666] hover:bg-[#F5F3F0] hover:text-[#202020]"
                        }
                        ${collapsed ? "justify-center" : ""}
                      `}
                    >
                      <item.icon size={20} className={isActive ? "text-[#E07850]" : ""} />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="text-sm"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E07850]"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-[#E5E5E5] py-4 px-3">
        <ul className="space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#F5F3F0] text-[#202020] font-medium"
                        : "text-[#666666] hover:bg-[#F5F3F0] hover:text-[#202020]"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <item.icon size={20} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="text-sm"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* User Profile */}
        <div className={`mt-4 pt-4 border-t border-[#E5E5E5] ${collapsed ? "px-0" : ""}`}>
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E07850] to-[#1B7F8E] flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              JD
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-[#202020] truncate">John Doe</p>
                  <p className="text-xs text-[#666666] truncate">HR Director</p>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!collapsed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-1.5 rounded-lg hover:bg-[#F5F3F0] text-[#666666] transition-colors"
                >
                  <LogOut size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
    </>
  )
}

export default DashboardSidebar
