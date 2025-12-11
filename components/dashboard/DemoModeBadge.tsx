"use client"

import { motion } from "framer-motion"
import { Eye } from "lucide-react"

export default function DemoModeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-4 right-4 z-[100] pointer-events-none"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E5E5] shadow-lg">
        <Eye size={14} className="text-[#666666]" />
        <span className="text-xs font-medium text-[#666666]">Demo Mode</span>
      </div>
    </motion.div>
  )
}
