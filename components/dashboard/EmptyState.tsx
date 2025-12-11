"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E07850]/10 to-[#1B7F8E]/10 flex items-center justify-center mb-6">
        <Icon size={32} className="text-[#666666]" />
      </div>
      <h3 className="text-xl font-semibold text-[#202020] mb-2 text-center">{title}</h3>
      <p className="text-base text-[#666666] text-center max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <motion.button
          onClick={onAction}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium hover:shadow-lg transition-all"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}
