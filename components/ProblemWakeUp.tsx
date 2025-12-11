"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, Calculator, DollarSign, Users, HeartCrack } from "lucide-react"

interface ProblemWakeUpProps {
  onOpenContact?: () => void
  onOpenCalculator?: () => void
}

const statCards = [
  {
    icon: DollarSign,
    iconColor: "text-[#E07850]",
    iconGlow: "bg-[#E07850]/20",
    value: "$200K",
    label: "Average Harassment Lawsuit",
    sublabel: "And you never saw it coming",
  },
  {
    icon: Users,
    iconColor: "text-[#1B7F8E]",
    iconGlow: "bg-[#1B7F8E]/20",
    value: "$30K",
    label: "Cost to Replace One Employee",
    sublabel: "They quit without telling you why",
  },
  {
    icon: HeartCrack,
    iconColor: "text-[#E07850]",
    iconGlow: "bg-[#E07850]/20",
    value: "73%",
    label: "Don't Believe Feedback Leads to Change",
    sublabel: "Your culture survey is a lie",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export default function ProblemWakeUp({ onOpenContact, onOpenCalculator }: ProblemWakeUpProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F3F0] pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #1B7F8E 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E07850]/10 border border-[#E07850]/30 shadow-[0_0_20px_rgba(224,120,80,0.15)]">
            <AlertTriangle className="w-4 h-4 text-[#E07850] animate-pulse" />
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="overflow-hidden whitespace-nowrap inline-block font-mono text-xs uppercase tracking-wider text-[#E07850]"
            >
              Critical Blind Spot
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0, 1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="text-[#E07850] font-mono"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-6">
          <motion.h1
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1], delay: 0.1 }}
            className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-[#202020] leading-tight"
          >
            67% of Your Workforce Has Something to Say.
          </motion.h1>
          <motion.h2
            initial={fadeInUp.initial}
            whileInView={fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1], delay: 0.2 }}
            className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-[#E07850] leading-tight mt-2"
          >
            0% Will Say It to Your Face.
          </motion.h2>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1], delay: 0.3 }}
          className="text-center text-lg md:text-xl text-[#666666] max-w-3xl mx-auto mb-16"
        >
          The employees who quit never told you why. The customers who churned stayed silent. The harassment victim never reported it. You can&apos;t fix what you can&apos;t see.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {statCards.map((card, index) => (
            <motion.div
              key={card.label}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1], delay: 0.3 + index * 0.08 }}
              whileHover={{
                scale: 1.03,
                y: -4,
                borderColor: "rgba(27, 127, 142, 0.3)",
              }}
              className="
                relative overflow-hidden
                bg-white
                border border-[#E5E5E5]
                rounded-2xl
                p-6
                group
                transition-colors duration-200
                shadow-sm
                hover:shadow-lg
              "
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B7F8E]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon with glow */}
              <div className="relative mb-4">
                <div className={`absolute inset-0 blur-xl ${card.iconGlow}`} />
                <card.icon className={`w-8 h-8 ${card.iconColor} relative z-10`} />
              </div>

              <div className="text-4xl font-bold text-[#202020] font-sans mb-2 relative z-10">{card.value}</div>
              <div className="text-sm text-[#404040] relative z-10">{card.label}</div>
              <div className="text-xs text-[#666666] italic mt-1 relative z-10">{card.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1], delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={onOpenContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              relative overflow-hidden
              px-8 py-4
              bg-gradient-to-r from-[#E07850] to-[#C9643D]
              text-white font-semibold
              rounded-full
              shadow-lg shadow-[#E07850]/25
              transition-all duration-150
              hover:shadow-xl hover:shadow-[#E07850]/30
              hover:rounded-2xl
              group
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              Find the Crisis Before It Finds You
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            onClick={onOpenCalculator}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              px-8 py-4
              bg-transparent
              text-[#202020] font-semibold
              rounded-full
              border border-[#202020]/30
              hover:border-[#202020]/50
              hover:bg-[#202020]/5
              hover:rounded-2xl
              transition-all duration-150
            "
          >
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculate What Silence Is Costing You
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="
            relative
            bg-white
            border border-[#E5E5E5]
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          {/* Pulsing indicator */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07850] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E07850]" />
            </span>
            <span className="text-xs font-mono text-[#E07850] uppercase tracking-wider">Live Risk</span>
          </div>

          <p className="text-[#666666] text-sm leading-relaxed mt-4 text-center max-w-3xl mx-auto">
            Every day you operate without employee trust infrastructure, you&apos;re one anonymous Glassdoor review, one
            surprise resignation, or one lawsuit away from a crisis.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
