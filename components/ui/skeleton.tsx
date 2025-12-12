'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SkeletonProps extends React.ComponentProps<'div'> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  count?: number
}

function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  count = 1,
  ...props
}: SkeletonProps) {
  const baseClass = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] dark:from-gray-700 dark:via-gray-600 dark:to-gray-700'

  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
        return 'rounded-lg'
      case 'card':
        return 'rounded-xl p-4'
      default:
        return 'rounded h-4 my-2'
    }
  }

  const skeletonStyle = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'card' ? '200px' : '16px')
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          data-slot="skeleton"
          className={cn(baseClass, getVariantStyles(), className)}
          style={skeletonStyle}
          {...props}
        />
      ))}
    </>
  )
}

function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={cn('glass-card p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="circular" width={32} height={32} />
      </div>
      <Skeleton variant="text" count={3} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  )
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="25%" />
          <Skeleton variant="text" width="25%" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 py-2">
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="25%" />
          </div>
        ))}
      </div>
    </div>
  )
}

function SkeletonChat() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="20%" height={12} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width="60%" height={60} />
        </div>
        <div className="flex gap-2 justify-end">
          <Skeleton variant="rectangular" width="70%" height={80} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width="50%" height={50} />
        </div>
      </div>
    </div>
  )
}

function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mx-auto mb-4"
        >
          <div className="w-full h-full rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">{message}</p>
      </div>
    </motion.div>
  )
}

export { Skeleton, SkeletonCard, SkeletonTable, SkeletonChat, LoadingScreen }
