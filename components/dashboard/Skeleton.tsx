"use client"

import { motion } from "framer-motion"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
}

export default function Skeleton({ className = "", variant = "rectangular", width, height }: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-[#E5E5E5] via-[#F5F3F0] to-[#E5E5E5] animate-shimmer"

  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  }

  const style: React.CSSProperties = {
    width: width || "100%",
    height: height || (variant === "text" ? "1rem" : "100%"),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Card skeleton component for dashboard cards
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-[#E5E5E5] ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={60} />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>

        {/* Footer */}
        <Skeleton variant="rectangular" height={40} />
      </div>
    </div>
  )
}

// List item skeleton
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  )
}

// Stats skeleton
export function StatsSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
      <Skeleton variant="circular" width={40} height={40} className="mb-3" />
      <Skeleton variant="text" width={80} height={32} className="mb-2" />
      <Skeleton variant="text" width={120} />
    </div>
  )
}
