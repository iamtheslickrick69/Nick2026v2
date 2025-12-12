"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import IPhoneMockup from "./IPhoneMockup"

interface ProblemWakeUpProps {
  onOpenContact?: () => void
}

export default function ProblemWakeUp({ onOpenContact }: ProblemWakeUpProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B7F8E] via-[#0e5a66] to-[#202020]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* 40% Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Subtle Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Enhanced Animated Gradient for Depth */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-br from-[#1B7F8E]/20 via-transparent to-[#E07850]/20"
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Gradient Orb 1 - Top Right (Teal) */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-gradient-to-br from-[#14b8a6]/20 to-[#0891b2]/25 rounded-full pointer-events-none"
        style={{ filter: "blur(120px)" }}
      />

      {/* Gradient Orb 2 - Bottom Left (Orange to Teal) */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute -bottom-48 -left-48 w-[800px] h-[800px] bg-gradient-to-tr from-[#E07850]/18 to-[#1B7F8E]/22 rounded-full pointer-events-none"
        style={{ filter: "blur(140px)" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
            >
              Meet Coro
              <br />
              <span className="text-white/95">Where Every Voice Is Heard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white mb-6 max-w-2xl lg:max-w-none font-normal leading-relaxed"
            >
              Every employee concern. Every customer insight. Every project update. Coro is the AI agent that makes sure
              nothing falls through the cracks—turning feedback into action, silence into clarity, and conversations into
              progress.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-[#E07850] mb-12 font-medium"
            >
              Because when everyone has a voice, everyone wins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4"
            >
              <motion.button
                onClick={onOpenContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#202020] font-semibold rounded-full shadow-2xl hover:shadow-white/20 transition-all group"
              >
                <span className="flex items-center gap-2">
                  Meet Coro
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

            {/* Social Proof Stats Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-4 mt-8 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>98% open rate</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>70%+ response rate</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: iPhone Mockup */}
          <div className="hidden lg:flex justify-center items-center">
            <IPhoneMockup />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </div>
    </section>
  )
}
