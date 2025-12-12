"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useAuthStore } from "@/lib/auth"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { LoadingScreen } from "@/components/ui/skeleton"
import {
  useKeyboardNavigation,
  useBreakpoint,
  useClickOutside,
  useSwipeGesture,
  useAnnouncer
} from "@/hooks/useAccessibility"
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  TrendingUp,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Phone,
  UserCheck,
  BarChart3,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Keyboard
} from "lucide-react"
import "@/styles/responsive.css"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Active Loops"
  },
  {
    name: "SMS Center",
    href: "/dashboard/sms",
    icon: MessageSquare,
    description: "Live Coro Conversations"
  },
  {
    name: "Loop Tracker",
    href: "/dashboard/loops",
    icon: UserCheck,
    description: "Feedback Pipeline"
  },
  {
    name: "People",
    href: "/dashboard/people",
    icon: Users,
    description: "Employee & Customer Management"
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Insights & Trends"
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "System Configuration"
  }
]

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, logout, switchRole } = useAuthStore()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mode, setMode] = useState<'employee' | 'customer' | 'combined'>('employee')
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)

  // Accessibility hooks
  useKeyboardNavigation()
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const { announce, Announcer } = useAnnouncer()

  // Click outside to close mobile menu
  const sidebarRef = useClickOutside(() => {
    if (isMobile) setMobileMenuOpen(false)
  })

  // Swipe gestures for mobile
  const swipeHandlers = useSwipeGesture(
    () => setMobileMenuOpen(false), // swipe left to close
    () => setMobileMenuOpen(true),  // swipe right to open
    undefined,
    undefined,
    75
  )

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14b8a6] mx-auto"></div>
          <p className="mt-4 text-[#666666]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-[#0a0a0a]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-card"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Backdrop */}
      {isMobile && mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden mobile-menu-backdrop visible"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          ref={sidebarRef as any}
          initial={{ x: -280 }}
          animate={{
            x: mobileMenuOpen || !isMobile ? 0 : -280,
            width: collapsed && !isMobile ? 60 : 280
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed left-0 top-0 h-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-[#E5E5E5] dark:border-[#202020] z-40 ${
            isMobile ? 'sidebar-mobile' : ''
          } ${mobileMenuOpen ? 'open' : ''}`}
          {...(isMobile ? swipeHandlers : {})}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E5E5] dark:border-[#202020]">
            {!collapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-xl gradient-text">LoopSync</span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block p-1.5 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* User Info */}
          {!collapsed && user && (
            <div className="p-4 border-b border-[#E5E5E5] dark:border-[#202020]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-[#202020] dark:text-white">{user.name}</p>
                  <p className="text-xs text-[#666666] dark:text-[#999999] capitalize">{user.role}</p>
                </div>
              </div>

              {/* Role Switcher (Demo) */}
              <div className="mt-3 flex gap-1">
                {['admin', 'manager', 'employee'].map((role) => (
                  <button
                    key={role}
                    onClick={() => switchRole(role as any)}
                    className={`flex-1 px-2 py-1 text-xs rounded-lg transition-all ${
                      user.role === role
                        ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white'
                        : 'bg-[#F5F3F0] dark:bg-[#1a1a1a] text-[#666666] dark:text-[#999999] hover:bg-[#ECEAE6] dark:hover:bg-[#202020]'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="p-2 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white shadow-lg'
                      : 'hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666] dark:text-[#999999]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} className={isActive ? 'text-white' : ''} />
                  {!collapsed && (
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-white/80' : 'text-[#9a9a9a] dark:text-[#666666]'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#E5E5E5] dark:border-[#202020]">
            {!collapsed && (
              <>
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666] dark:text-[#999999] transition-all mb-2"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-[#666666] dark:text-[#999999] hover:text-red-600 transition-all"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-lg w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 gradient-text">Keyboard Shortcuts</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Search</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">⌘K</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Dashboard</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Alt+D</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Messages</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Alt+M</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Loops</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Alt+L</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Settings</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Alt+S</kbd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Close Modal</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">ESC</kbd>
                </div>
              </div>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="mt-6 w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <motion.main
        animate={{
          marginLeft: isMobile ? 0 : collapsed ? 60 : 280
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`min-h-screen ${!isMobile ? 'lg:ml-[280px]' : ''}`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#E5E5E5] dark:border-[#202020]">
          <div className="h-16 px-6 flex items-center justify-between">
            {/* Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="mode-toggle">
                <div
                  className="mode-toggle-indicator"
                  style={{
                    width: mode === 'employee' ? '90px' : mode === 'customer' ? '90px' : '100px',
                    transform: `translateX(${
                      mode === 'employee' ? '0px' : mode === 'customer' ? '94px' : '188px'
                    })`
                  }}
                />
                <button
                  onClick={() => setMode('employee')}
                  className={`mode-toggle-button ${mode === 'employee' ? 'active' : ''}`}
                >
                  <Users size={14} className="inline mr-1" />
                  Employee
                </button>
                <button
                  onClick={() => setMode('customer')}
                  className={`mode-toggle-button ${mode === 'customer' ? 'active' : ''}`}
                >
                  <Phone size={14} className="inline mr-1" />
                  Customer
                </button>
                <button
                  onClick={() => setMode('combined')}
                  className={`mode-toggle-button ${mode === 'combined' ? 'active' : ''}`}
                >
                  <BarChart3 size={14} className="inline mr-1" />
                  Combined
                </button>
              </div>

              {/* Live Indicators */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-live"></span>
                  Live
                </span>
                <span className="text-sm text-[#666666] dark:text-[#999999]">
                  {mode === 'employee' ? '12 Active Loops' : mode === 'customer' ? '8 Open Issues' : '20 Total Active'}
                </span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                id="global-search"
                className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-xl transition-all"
                aria-label="Search"
              >
                <Search size={20} className="text-[#666666] dark:text-[#999999]" />
              </button>
              <button
                className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-xl transition-all relative"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-[#666666] dark:text-[#999999]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowKeyboardShortcuts(true)}
                className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-xl transition-all desktop-only"
                aria-label="Keyboard Shortcuts"
              >
                <Keyboard size={20} className="text-[#666666] dark:text-[#999999]" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </motion.main>

      {/* Screen Reader Announcer */}
      <Announcer />
    </div>
  )
}

// Export with Error Boundary and Suspense
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen message="Loading dashboard..." />}>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </Suspense>
    </ErrorBoundary>
  )
}
