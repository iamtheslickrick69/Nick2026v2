"use client"

import { motion } from "framer-motion"
import { MessageSquare, Eye, CheckCircle, UserCheck, Lock, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Employee Texts Coro",
    description: "Anonymous feedback sent via SMS",
    gradient: "from-emerald-500 to-emerald-600",
    color: "#10b981",
  },
  {
    icon: Eye,
    title: "Dashboard Flags Issue",
    description: "Leadership sees (anonymized)",
    gradient: "from-blue-500 to-blue-600",
    color: "#3b82f6",
  },
  {
    icon: CheckCircle,
    title: "Leader Acknowledges",
    description: "Employee gets confirmation",
    gradient: "from-cyan-500 to-cyan-600",
    color: "#06b6d4",
  },
  {
    icon: UserCheck,
    title: "Assigned to Owner",
    description: "Tracked to resolution",
    gradient: "from-purple-500 to-purple-600",
    color: "#a855f7",
  },
  {
    icon: Lock,
    title: "Loop Closes",
    description: "Trust builds",
    gradient: "from-pink-500 to-pink-600",
    color: "#ec4899",
  },
]

const stats = [
  { value: "100%", label: "Issues Tracked", sublabel: "Nothing falls through cracks" },
  { value: "24hr", label: "Avg Response Time", sublabel: "Leadership proves they're listening" },
  { value: "3x", label: "Trust Increase", sublabel: "Employees see action, not promises" },
]

export default function ClosedLoopTracker() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(224,120,80,0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4"
          >
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 font-mono uppercase tracking-wide">Only LoopSync</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] mb-6"
          >
            The Only Platform That Proves Leadership Acted
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#666666] max-w-3xl mx-auto"
          >
            Every concern tracked. Every action logged. Every employee heard.
          </motion.p>
        </div>

        {/* 5-Step Flow */}
        <div className="relative mb-16">
          {/* Animated Connection Line (Desktop) */}
          <div className="absolute top-12 left-0 right-0 h-1 hidden lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 via-cyan-500 via-purple-500 to-pink-500 origin-left"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#E07850] flex items-center justify-center text-sm font-bold text-[#E07850] z-10 shadow-sm">
                  {index + 1}
                </div>

                {/* Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg group cursor-pointer`}
                >
                  {/* Pulsing Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-50`}
                  />
                  <step.icon className="w-12 h-12 text-white relative z-10" strokeWidth={2} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#202020] mb-2">{step.title}</h3>
                <p className="text-sm text-[#666666]">{step.description}</p>

                {/* Arrow to next (desktop, not on last) */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-12 -right-6 w-6 h-6 text-[#666666]/40" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
              className="bg-white border border-[#E5E5E5] rounded-2xl p-6 text-center shadow-sm transition-all"
            >
              <div className="text-4xl font-bold text-[#E07850] mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-[#202020] mb-1">{stat.label}</div>
              <div className="text-xs text-[#666666]">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiator Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <Lock className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-bold text-[#202020]">
                Competitors collect feedback. We prove it was acted on.
              </div>
              <div className="text-xs text-[#666666] mt-1">Culture Amp, 15Five, and Lattice can't do this.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
