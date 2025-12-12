"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

interface CTASectionProps {
  onOpenContact?: () => void
  onOpenVideo?: () => void
}

export default function CTASection({ onOpenContact, onOpenVideo }: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5" />

      {/* Fade overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-transparent to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        {/* Centered text content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] mb-6"
          >
            Right Now, Someone on Your Team Is Thinking About Quitting.
            <br />
            You Just Don't Know It Yet.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.1, 0, 0.1, 1] }}
            className="text-lg md:text-xl text-[#666666] mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Coro closes the blind spots. See what you're missing before it's too late.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={onOpenContact}
              whileHover={{
                scale: 1.02,
                borderRadius: "16px",
                boxShadow: "0 8px 24px -4px rgba(224, 120, 80, 0.35)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.455, 0.03, 0.515, 0.955] }}
              className="
                px-8 py-4
                bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]
                text-white font-semibold text-base
                rounded-full
                shadow-lg shadow-[#14b8a6]/20
                flex items-center gap-2
                group
              "
            >
              <span className="hidden sm:inline">See What Your Employees Aren't Telling You</span>
              <span className="sm:hidden">Find Your Blind Spots</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={onOpenVideo}
              whileHover={{
                scale: 1.02,
                borderRadius: "16px",
                borderColor: "#202020",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.455, 0.03, 0.515, 0.955] }}
              className="
                px-8 py-4
                bg-transparent
                text-[#202020] font-semibold text-base
                rounded-full
                border border-[#202020]/30
                hover:border-[#202020]
                flex items-center gap-2
                transition-colors duration-150
              "
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
