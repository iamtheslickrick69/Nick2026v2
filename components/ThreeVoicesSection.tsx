"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Activity, Sparkles, TrendingUp, Users, User, MessageSquare, BarChart3, QrCode, ArrowRight } from "lucide-react"

interface NodeProps {
  position: { x: number; y: number }
  icon: React.ElementType
  title: string
  subtitle: string
  metric: string
  color: string
  gradient: string
  delay: number
}

function NodeComponent({ position, icon: Icon, title, subtitle, metric, color, gradient, delay }: NodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className="cursor-pointer group"
    >
      {/* Pulsing Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className={`absolute inset-0 rounded-full blur-xl bg-gradient-to-br ${gradient} -z-10`}
      />

      {/* Node Circle */}
      <div
        className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl ring-4 ring-white`}
        style={{ boxShadow: `0 10px 40px ${color}40` }}
      >
        <Icon className="w-9 h-9 text-white" strokeWidth={2.5} />

        {/* Metric Badge */}
        <div className="absolute -top-2 -right-2 bg-white px-2 py-1 rounded-full border-2 border-white shadow-lg">
          <span className="text-[10px] font-bold text-[#202020] whitespace-nowrap">{metric}</span>
        </div>
      </div>

      {/* Labels */}
      <div className="mt-3 text-center">
        <p className="text-base font-bold text-[#202020]">{title}</p>
        <p className="text-xs text-[#666666]">{subtitle}</p>
      </div>
    </motion.div>
  )
}

const cards = [
  {
    icon: MessageSquare,
    title: "Employees: Voice Without Fear",
    description:
      "Share feedback instantly via SMS. No apps. No logins. No friction. Complete anonymity with granular privacy controls. Your voice matters without risking your career.",
    example: 'Example: "I\'m burned out but afraid to say it" → Coro receives instantly → Protected forever',
    color: "emerald",
    gradient: "from-teal-500 to-cyan-600",
    bgLight: "from-teal-50 to-cyan-100/50",
    border: "border-teal-200",
    textColor: "text-teal-600",
    hoverColor: "hover:text-teal-700",
  },
  {
    icon: BarChart3,
    title: "Executives: Truth Without Politics",
    description:
      "Real-time visibility into sentiment, blind spots, and emerging risks across employees AND customers. See reality before it becomes a crisis. Act with confidence.",
    example: 'Dashboard shows: "3 teams reporting burnout + 12 customers mentioning competitor" → Complete intelligence',
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgLight: "from-blue-50 to-blue-100/50",
    border: "border-blue-200",
    textColor: "text-blue-600",
    hoverColor: "hover:text-blue-700",
  },
  {
    icon: QrCode,
    title: "Customers: Channel Without Hostility",
    description:
      "QR-enabled feedback flows into the same neutral system. Tell leadership the truth without threatening to leave. External signal meets internal truth — complete organizational clarity.",
    example: 'Customer scans QR: "Your support team is hiding problems" → Leadership sees it → Action taken',
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    bgLight: "from-purple-50 to-purple-100/50",
    border: "border-purple-200",
    textColor: "text-purple-600",
    hoverColor: "hover:text-purple-700",
  },
]

export default function ThreeVoicesSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50/30 via-white to-white">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
          >
            <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-600">Real-Time Feedback Loop</span>
          </motion.div>

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold text-[#14b8a6] uppercase tracking-widest mb-3 font-mono"
          >
            THE TRIANGLE OF TRUST
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] mb-4"
          >
            Every Voice Protected. Every Truth Delivered.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#666666]"
          >
            Employees speak without fear. Customers share without hostility. Executives see truth through one neutral AI escrow.
          </motion.p>
        </div>

        {/* Living Triangle Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto mb-20 h-[500px] md:h-[700px]"
        >
          {/* SVG for connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 700"
            style={{ filter: "drop-shadow(0 10px 40px rgba(59, 130, 246, 0.15))" }}
          >
            <defs>
              {/* Gradient for Employee → Executive line */}
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>

              {/* Gradient for Customer → Executive line */}
              <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>

              {/* Gradient for Employee ↔ Customer line */}
              <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>

              {/* Arrow markers */}
              <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
              </marker>
              <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#a855f7" />
              </marker>
            </defs>

            {/* Connection Lines - animated draw */}
            {/* Employee to Executive */}
            <motion.line
              x1="140"
              y1="480"
              x2="290"
              y2="120"
              stroke="url(#lineGradient1)"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#arrow-blue)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            />

            {/* Customer to Executive */}
            <motion.line
              x1="460"
              y1="480"
              x2="310"
              y2="120"
              stroke="url(#lineGradient2)"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#arrow-blue)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            />

            {/* Employee to Customer (bottom) */}
            <motion.line
              x1="160"
              y1="500"
              x2="440"
              y2="500"
              stroke="url(#lineGradient3)"
              strokeWidth="4"
              strokeLinecap="round"
              markerEnd="url(#arrow-purple)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            />

            {/* Flowing particles on lines */}
            {[
              // Employee to Executive line particles
              { x1: 140, y1: 480, x2: 290, y2: 120, fill: "#10b981" },
              { x1: 140, y1: 480, x2: 290, y2: 120, fill: "#10b981" },
              // Customer to Executive line particles
              { x1: 460, y1: 480, x2: 310, y2: 120, fill: "#a855f7" },
              { x1: 460, y1: 480, x2: 310, y2: 120, fill: "#a855f7" },
              // Employee to Customer line particles
              { x1: 160, y1: 500, x2: 440, y2: 500, fill: "#3b82f6" },
              { x1: 160, y1: 500, x2: 440, y2: 500, fill: "#3b82f6" },
            ].map((particle, i) => {
              const progress = i * 0.7
              return (
                <motion.circle
                  key={i}
                  r="4"
                  fill={particle.fill}
                  cx={particle.x1}
                  cy={particle.y1}
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [particle.x1, particle.x2],
                    cy: [particle.y1, particle.y2],
                    opacity: [0, 0.8, 0.8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: progress,
                    ease: "linear",
                  }}
                />
              )
            })}
          </svg>

          {/* Center Coro Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
            </motion.div>
            <span className="text-xs font-semibold text-[#666666] bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              Coro AI Escrow
            </span>
          </motion.div>

          {/* Three Nodes */}
          {/* Executive Node - Top Center */}
          <NodeComponent
            position={{ x: 50, y: 12 }}
            icon={TrendingUp}
            title="Executive"
            subtitle="Leadership"
            metric="24hr avg response"
            color="#3b82f6"
            gradient="from-blue-500 to-blue-600"
            delay={0.6}
          />

          {/* Employee Node - Bottom Left */}
          <NodeComponent
            position={{ x: 20, y: 70 }}
            icon={Users}
            title="Employee"
            subtitle="Workforce"
            metric="850 voices"
            color="#10b981"
            gradient="from-teal-500 to-cyan-600"
            delay={0.8}
          />

          {/* Customer Node - Bottom Right */}
          <NodeComponent
            position={{ x: 80, y: 70 }}
            icon={User}
            title="Customer"
            subtitle="External Voice"
            metric="Real-time insights"
            color="#a855f7"
            gradient="from-purple-500 to-purple-600"
            delay={1.0}
          />
        </motion.div>

        {/* Three Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -12, boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" }}
              className="relative group"
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl" />

              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient.replace("500", "500/10").replace("600", "600/10")} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative p-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <card.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </motion.div>

                <h3 className="text-xl font-bold text-[#202020] mb-3">{card.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed mb-4">{card.description}</p>

                {/* Example box */}
                <div className={`p-3 rounded-lg bg-gradient-to-br ${card.bgLight} border ${card.border} mb-4`}>
                  <p className="text-xs text-[#202020]/80 italic">{card.example}</p>
                </div>

                {/* Learn More */}
                <motion.a
                  href="#"
                  whileHover={{ x: 5 }}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${card.textColor} ${card.hoverColor} transition-colors`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto group"
          >
            See the Triangle in Action
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
