"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Heart, Users, ChevronDown, Play } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Protection First",
    description: "Every feature is designed to protect employee privacy while surfacing critical insights.",
    color: "#06b6d4",
  },
  {
    icon: Heart,
    title: "Genuine Care",
    description: "We believe healthy workplaces start with listening—really listening—to your people.",
    color: "#14b8a6",
  },
  {
    icon: Users,
    title: "Collective Voice",
    description: "One message can reveal a trend. Aggregated insights drive meaningful change.",
    color: "#06b6d4",
  },
]

export function FounderSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="relative py-24 px-6 md:px-8 overflow-hidden">
      {/* Video background placeholder */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          }}
        />
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(27, 127, 142, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(224, 120, 80, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(27, 127, 142, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-tight uppercase mb-6"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              background: "rgba(224, 120, 80, 0.2)",
              color: "#14b8a6",
            }}
          >
            <Heart className="w-3.5 h-3.5" />
            Our Mission
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
          >
            Built by People Who
            <br />
            <span style={{ color: "#14b8a6" }}>Understand the Problem</span>
          </h2>
        </motion.div>

        {/* Collapsible Mission Card */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="rounded-2xl p-8 backdrop-blur-xl"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Play button and preview */}
            <div className="flex items-start gap-6 mb-6">
              <motion.button
                className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #14b8a6, #d96a42)",
                  boxShadow: "0 0 30px rgba(224, 120, 80, 0.4)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              </motion.button>

              <div className="flex-1">
                <p
                  className="text-white/90 text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
                >
                  "We started LoopSync after watching too many good people leave great companies because no one knew
                  they were struggling."
                </p>
                <p
                  className="text-white/60 text-sm mt-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
                >
                  — Founder & CEO
                </p>
              </div>
            </div>

            {/* The 67% stat */}
            <div
              className="flex items-center justify-center gap-4 py-6 border-y mb-6"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <span
                className="text-6xl font-bold"
                style={{
                  fontFamily: "var(--font-figtree), Figtree, sans-serif",
                  background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                67%
              </span>
              <p
                className="text-white/80 text-sm max-w-xs text-left"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
              >
                of employees who quit say they would have stayed if leadership had addressed their concerns earlier.
              </p>
            </div>

            {/* Expandable content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className="text-white/70 leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
                  >
                    Traditional surveys fail because they're too slow, too formal, and too disconnected from daily
                    reality. By the time results come in, the damage is done—your best people have already updated their
                    LinkedIn.
                  </p>
                  <p
                    className="text-white/70 leading-relaxed"
                    style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
                  >
                    LoopSync creates a continuous, anonymous dialogue between employees and leadership. Real concerns
                    surface in real time. Issues get addressed before they become resignations. Culture improves one
                    conversation at a time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand/Collapse button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 mx-auto mt-4 text-sm text-white/60 hover:text-white/90 transition-colors"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
            >
              {isExpanded ? "Read less" : "Read our full story"}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group p-6 rounded-2xl backdrop-blur-xl transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{
                y: -4,
                background: "rgba(255, 255, 255, 0.08)",
                borderColor: `${value.color}40`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ background: `${value.color}20` }}
              >
                <value.icon className="w-6 h-6" style={{ color: value.color }} />
              </div>

              <h3
                className="text-lg font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
              >
                {value.title}
              </h3>

              <p
                className="text-sm text-white/60 leading-relaxed"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FounderSection
