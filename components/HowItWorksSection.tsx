"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Shield, BarChart2, CheckCircle, Plus, Minus } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Employees share",
    description:
      "Team members text Coro, our AI assistant, anytime. No apps, no accounts — just natural conversation via SMS.",
  },
  {
    number: "02",
    icon: Shield,
    title: "Identity protected",
    description:
      "Advanced encryption ensures complete anonymity. Leadership sees themes and insights, never names or identifiers.",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Insights surface",
    description:
      "AI synthesizes feedback into actionable intelligence. Sentiment trends, risk alerts, and cultural health scores — delivered in real time.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Action taken",
    description:
      "Leaders acknowledge issues, assign ownership, and close the loop. Employees see progress. Trust is rebuilt.",
  },
]

export default function HowItWorksSection() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <section id="how-it-works" className="relative bg-[#F5F3F0] py-20 md:py-28 overflow-hidden">
      {/* Top Gradient Blend */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block text-xs font-semibold text-[#E07850] uppercase tracking-widest mb-4 font-mono"
          >
            HOW IT WORKS
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#202020] mb-4 leading-tight"
          >
            AI Shouldn't Replace Conversations.
            <br />
            It Should Start Them.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#666666]"
          >
            From anonymous feedback to action loops that close—Coro doesn't just collect voices, it catalyzes real
            dialogue.
          </motion.p>
        </div>

        {/* Accordion Steps */}
        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step, index) => {
            const isExpanded = expandedIndex === index
            const Icon = step.icon
            const ToggleIcon = isExpanded ? Minus : Plus

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                className={`
                  bg-white 
                  border-2 
                  rounded-2xl 
                  overflow-hidden 
                  cursor-pointer 
                  will-change-transform
                  transition-all duration-300
                  ${
                    isExpanded
                      ? "border-[#1B7F8E] shadow-lg shadow-[#1B7F8E]/10"
                      : "border-[#E5E5E5] hover:border-[#1B7F8E]/50"
                  }
                `}
              >
                {/* Header (Always Visible) */}
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Step Number */}
                    <span className="text-sm font-semibold text-[#666666] font-mono">{step.number}</span>

                    {/* Icon */}
                    <div
                      className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                      ${isExpanded ? "bg-[#1B7F8E]/20" : "bg-[#F5F3F0]"}
                    `}
                    >
                      <Icon
                        className={`
                        w-5 h-5 transition-colors
                        ${isExpanded ? "text-[#1B7F8E]" : "text-[#202020]"}
                      `}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#202020]">{step.title}</h3>
                  </div>

                  {/* Toggle Icon */}
                  <ToggleIcon
                    className={`
                    w-6 h-6 transition-colors flex-shrink-0
                    ${isExpanded ? "text-[#1B7F8E]" : "text-[#666666]"}
                  `}
                  />
                </div>

                {/* Description (Expandable) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="pl-14">
                          <p className="text-base text-[#666666] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
