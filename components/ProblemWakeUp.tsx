"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ProblemWakeUpProps {
  onOpenContact?: () => void
}

export default function ProblemWakeUp({ onOpenContact }: ProblemWakeUpProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#14b8a6] via-[#06b6d4] to-[#3b82f6]">
      {/* Subtle Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
        >
          Your Team Is Drowning in Apps.
          <br />
          <span className="text-white/95">You're Flying Blind.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white mb-6 max-w-4xl mx-auto font-medium leading-relaxed"
        >
          They archive your emails. They mute your Slack. But they read every text.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/90 mb-4 max-w-4xl mx-auto font-light leading-relaxed"
        >
          Coro is the AI agent that lives in SMS—the only channel your employees actually use. Whether you have 100 employees or 5,000, Coro has real conversations with every single one, surfaces what matters, and gives you the insights you need to lead—without adding another app they'll ignore.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-white/80 mb-12 max-w-3xl mx-auto font-light italic"
        >
          98% SMS open rate vs. 20% email. This isn't another tool. It's the one that actually works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onOpenContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-[#202020] font-semibold rounded-full shadow-2xl hover:shadow-white/20 transition-all group"
          >
            <span className="flex items-center gap-2">
              See What You're Missing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all"
          >
            See How It Works
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
