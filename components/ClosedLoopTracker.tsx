"use client"

import { motion } from "framer-motion"
import { MessageSquare, Eye, CheckCircle, UserCheck, Lock, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Employee Texts Coro",
    description: "Anonymous feedback sent via SMS",
    gradient: "from-teal-500 to-teal-600",
    color: "#14b8a6",
  },
  {
    icon: Eye,
    title: "Dashboard Flags Issue",
    description: "Leadership sees (anonymized)",
    gradient: "from-cyan-500 to-blue-500",
    color: "#06b6d4",
  },
  {
    icon: CheckCircle,
    title: "Leader Acknowledges",
    description: "Employee gets confirmation",
    gradient: "from-blue-500 to-blue-600",
    color: "#3b82f6",
  },
  {
    icon: UserCheck,
    title: "Assigned to Owner",
    description: "Tracked to resolution",
    gradient: "from-blue-600 to-indigo-600",
    color: "#4f46e5",
  },
  {
    icon: Lock,
    title: "Loop Closes",
    description: "Trust builds",
    gradient: "from-sky-500 to-cyan-500",
    color: "#0ea5e9",
  },
]

const stats = [
  { value: "100%", label: "Issues Tracked", sublabel: "Nothing falls through cracks" },
  { value: "24hr", label: "Avg Response Time", sublabel: "Leadership proves they're listening" },
  { value: "3x", label: "Trust Increase", sublabel: "Employees see action, not promises" },
]

export default function ClosedLoopTracker() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Teal-Blue gradient overlay for subtle brand color */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-cyan-500/3 to-blue-500/5" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(20,184,166,0.15) 1px, transparent 0)",
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 mb-4"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] mb-6 leading-tight"
            style={{ textShadow: "0 2px 8px rgba(255,255,255,0.5)" }}
          >
            The Only Platform That Proves Leadership Acted
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-[#666666] max-w-3xl mx-auto font-medium"
            style={{ textShadow: "0 2px 4px rgba(255,255,255,0.8)" }}
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
              className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 via-blue-500 via-blue-600 to-indigo-600 origin-left"
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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#14b8a6] flex items-center justify-center text-sm font-bold text-[#14b8a6] z-10 shadow-sm">
                  {index + 1}
                </div>

                {/* Minimalist Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="relative w-20 h-20 rounded-2xl bg-white/70 backdrop-blur-sm border-2 flex items-center justify-center mb-6 shadow-lg group cursor-pointer transition-all"
                  style={{
                    borderColor: step.color,
                    boxShadow: `0 4px 24px -4px ${step.color}40`,
                  }}
                >
                  {/* Subtle glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}10, ${step.color}20)`,
                    }}
                  />
                  <step.icon className="relative z-10" size={32} strokeWidth={1.5} style={{ color: step.color }} />
                </motion.div>

                {/* Content */}
                <h3
                  className="text-lg font-bold text-[#202020] mb-2"
                  style={{ textShadow: "0 2px 4px rgba(255,255,255,0.9)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#666666] font-medium" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
                  {step.description}
                </p>

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
              whileHover={{ y: -4, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.15)" }}
              className="bg-white/90 backdrop-blur-md border border-[#E5E5E5] rounded-2xl p-6 text-center shadow-lg transition-all"
            >
              <div className="text-4xl font-bold text-[#14b8a6] mb-2">{stat.value}</div>
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
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-blue-500/30 shadow-lg">
            <Lock className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-bold text-[#202020]">
                Competitors collect feedback. We prove it was acted on.
              </div>
              <div className="text-xs text-[#666666] mt-1 font-medium">
                Culture Amp, 15Five, and Lattice can't do this.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
