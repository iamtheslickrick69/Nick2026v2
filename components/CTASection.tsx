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
            They Say AI Divides.
            <br />
            We Say AI Unites.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.1, 0, 0.1, 1] }}
            className="text-lg md:text-xl text-[#666666] mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            While others build AI to automate conversations, we built Coro to finally make them possible.
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
                bg-gradient-to-r from-[#E07850] to-[#C9643D]
                text-white font-semibold text-base
                rounded-full
                shadow-lg shadow-[#E07850]/20
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

        {/* Animated Orb + Meet Coro Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
          className="flex flex-col items-center justify-center"
        >
          {/* Orb Container */}
          <div className="relative w-[240px] h-[240px] mb-6">
            {/* Glow effect behind orb */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 via-orange-500/20 to-rose-500/30 blur-3xl" />

            {/* Orb circle */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 40px rgba(224, 120, 80, 0.2)",
                  "0 0 60px rgba(224, 120, 80, 0.4)",
                  "0 0 40px rgba(224, 120, 80, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200"
            >
              {/* Animated gradient background */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-[-50%] w-[200%] h-[200%]"
                style={{
                  background: "conic-gradient(from 0deg, #f59e0b, #f97316, #f43f5e, #a855f7, #f59e0b)",
                }}
              />

              {/* Inner glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
            </motion.div>
          </div>

          {/* Meet Coro Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="
              inline-flex items-center 
              px-6 py-3 
              rounded-full 
              bg-[#E07850]/10 
              border border-[#E07850]/30
            "
          >
            <p className="text-lg text-[#E07850] italic font-medium">Meet Coro</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
