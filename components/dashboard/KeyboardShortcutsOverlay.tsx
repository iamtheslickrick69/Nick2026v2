"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Command, Search, Zap, BarChart3, AlertTriangle, PlusCircle } from "lucide-react"

const shortcuts = [
  {
    category: "General",
    icon: Command,
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open global search" },
      { keys: ["?"], description: "Show this help overlay" },
      { keys: ["Esc"], description: "Close modals and overlays" },
    ],
  },
  {
    category: "Navigation",
    icon: Zap,
    shortcuts: [
      { keys: ["↑", "↓"], description: "Navigate search results" },
      { keys: ["↵"], description: "Select search result" },
      { keys: ["Tab"], description: "Navigate between sections" },
    ],
  },
  {
    category: "Actions",
    icon: PlusCircle,
    shortcuts: [
      { keys: ["N"], description: "Create new action item" },
      { keys: ["⌘", "Enter"], description: "Save current form" },
      { keys: ["⌘", "S"], description: "Quick save/submit" },
    ],
  },
  {
    category: "View",
    icon: BarChart3,
    shortcuts: [
      { keys: ["T"], description: "Open trend analysis modal" },
      { keys: ["R"], description: "Toggle risk radar view" },
      { keys: ["F"], description: "Focus feedback feed" },
    ],
  },
]

export default function KeyboardShortcutsOverlay() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press "?" to open (Shift + /)
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Check if we're not in an input field
        const target = e.target as HTMLElement
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault()
          setIsOpen(true)
        }
      }

      // Press Escape to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Overlay */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5E5E5] bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                      <Command className="w-7 h-7" />
                      Keyboard Shortcuts
                    </h2>
                    <p className="text-sm text-white/80">Navigate LoopSync like a pro</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shortcuts.map((category, idx) => {
                    const Icon = category.icon
                    return (
                      <motion.div
                        key={category.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-4"
                      >
                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B7F8E] to-[#06b6d4] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#202020]">{category.category}</h3>
                        </div>

                        {/* Shortcuts */}
                        <div className="space-y-3">
                          {category.shortcuts.map((shortcut, sIdx) => (
                            <motion.div
                              key={sIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + sIdx * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] transition-colors"
                            >
                              <span className="text-sm text-[#202020]">{shortcut.description}</span>
                              <div className="flex items-center gap-1">
                                {shortcut.keys.map((key, kIdx) => (
                                  <span key={kIdx} className="flex items-center gap-1">
                                    <kbd className="px-2.5 py-1.5 rounded-lg bg-white border-2 border-[#E5E5E5] font-mono text-xs font-semibold text-[#202020] shadow-sm min-w-[28px] text-center">
                                      {key}
                                    </kbd>
                                    {kIdx < shortcut.keys.length - 1 && (
                                      <span className="text-[#9a9a9a] text-xs mx-0.5">+</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#E5E5E5] bg-[#F5F3F0]">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#666666]">
                    Press <kbd className="px-2 py-1 rounded bg-white border border-[#E5E5E5] font-mono text-xs">?</kbd>{" "}
                    anytime to see this overlay
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] text-white font-semibold text-sm hover:shadow-lg transition-all"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
