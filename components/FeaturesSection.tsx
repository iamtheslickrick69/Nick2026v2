"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Activity, CheckCircle, Target, TrendingUp, ChevronDown } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Early Warning System",
    icon: AlertTriangle,
    category: "Detection",
    description:
      "AI-powered detection that catches emerging issues before they escalate. Real-time alerts on sentiment shifts, recurring themes, and risk signals.",
    preview: "risk-indicators",
  },
  {
    id: 2,
    title: "Culture Health Score",
    icon: Activity,
    category: "Analytics",
    description:
      "A single metric (0-100) combining engagement, sentiment, and leadership responsiveness. Your organization's trust baseline — updated continuously.",
    preview: "health-score",
  },
  {
    id: 3,
    title: "Action Tracker",
    icon: CheckCircle,
    category: "Accountability",
    description:
      "Every issue gets acknowledged, assigned, and resolved. Employees see status updates. Silence becomes action.",
    preview: "action-checklist",
  },
  {
    id: 4,
    title: "Targeted Outreach",
    icon: Target,
    category: "Proactive",
    description:
      "Schedule culture pulses, safety check-ins, or leadership audits. Coro delivers them via SMS. Responses flow directly into your dashboard.",
    preview: "outreach-pills",
  },
  {
    id: 5,
    title: "Trend Analysis",
    icon: TrendingUp,
    category: "Intelligence",
    description:
      "Coro surfaces patterns, not noise. AI identifies recurring themes across feedback without ever exposing individual identities.",
    preview: "hashtag-cloud",
  },
]

function RiskIndicatorsPreview() {
  const indicators = [
    { label: "Retention Risk", level: "high", color: "bg-red-500" },
    { label: "Legal Exposure", level: "medium", color: "bg-amber-500" },
    { label: "Team Health", level: "low", color: "bg-blue-500" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap gap-3"
    >
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.15 + index * 0.1 }}
          className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100"
        >
          <div className={`w-2 h-2 rounded-full ${indicator.color}`} />
          <span className="text-sm text-[#202020] font-medium">{indicator.label}:</span>
          <span
            className={`text-sm font-semibold ${
              indicator.level === "high"
                ? "text-red-600"
                : indicator.level === "medium"
                  ? "text-amber-600"
                  : "text-blue-600"
            }`}
          >
            {indicator.level}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function HealthScorePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex items-center gap-4"
    >
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E5E5" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.82 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{
              strokeDasharray: "264",
              strokeDashoffset: "0",
            }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-2xl font-bold text-[#202020]"
          >
            82
          </motion.span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
      >
        +4 this week
      </motion.div>
    </motion.div>
  )
}

function ActionChecklistPreview() {
  const steps = [
    { label: "Received", completed: true },
    { label: "Processing", completed: true },
    { label: "Reviewed", completed: true },
    { label: "Action Taken", completed: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-col gap-2"
    >
      {steps.map((step, index) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.15 + index * 0.1 }}
          className="flex items-center gap-3"
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              step.completed ? "bg-[#06b6d4]" : "border-2 border-gray-300"
            }`}
          >
            {step.completed && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className={`text-sm ${step.completed ? "text-[#202020]" : "text-[#666666]"}`}>{step.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function OutreachPillsPreview() {
  const pills = ["Culture Pulse", "Safety Check", "Leadership 360"]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap gap-2"
    >
      {pills.map((pill, index) => (
        <motion.button
          key={pill}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.15 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-white border border-[#06b6d4] text-[#06b6d4] rounded-full text-sm font-medium hover:bg-[#06b6d4] hover:text-white transition-colors duration-200"
        >
          {pill}
        </motion.button>
      ))}
    </motion.div>
  )
}

function HashtagCloudPreview() {
  const hashtags = [
    { tag: "#workload", size: "text-base" },
    { tag: "#management", size: "text-lg" },
    { tag: "#growth", size: "text-sm" },
    { tag: "#recognition", size: "text-base" },
    { tag: "#culture", size: "text-lg" },
    { tag: "#flexibility", size: "text-sm" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap gap-3 items-center"
    >
      {hashtags.map((item, index) => (
        <motion.span
          key={item.tag}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 + index * 0.08 }}
          className={`${item.size} font-medium text-[#06b6d4] hover:text-[#14b8a6] transition-colors cursor-default`}
        >
          {item.tag}
        </motion.span>
      ))}
    </motion.div>
  )
}

function PreviewElement({ type }: { type: string }) {
  switch (type) {
    case "risk-indicators":
      return <RiskIndicatorsPreview />
    case "health-score":
      return <HealthScorePreview />
    case "action-checklist":
      return <ActionChecklistPreview />
    case "outreach-pills":
      return <OutreachPillsPreview />
    case "hashtag-cloud":
      return <HashtagCloudPreview />
    default:
      return null
  }
}

export default function FeaturesSection() {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#14b8a6] mb-4 block">FEATURES</span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#202020] mb-6 text-balance">
            AI That Brings Humans Closer, Not Further Apart
          </h2>
          <p className="text-xl text-[#666666] max-w-2xl mx-auto text-pretty">
            By guaranteeing anonymity and surfacing truth, Coro builds the trust that brings teams together.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {features.map((feature, index) => {
            const isOpen = openId === feature.id
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: isOpen ? 1 : 1.02 }}
                className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#06b6d4] shadow-lg shadow-[#06b6d4]/10"
                    : "border-[#E5E5E5] bg-white hover:border-[#06b6d4]/30"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(feature.id)}
                  className="w-full px-6 py-5 flex items-center gap-4 text-left"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-[#06b6d4]/20" : "bg-[#F5F3F0]"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isOpen ? "text-[#06b6d4]" : "text-[#666666]"
                      }`}
                    />
                  </div>

                  {/* Title & Category */}
                  <div className="flex-1 flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-[#202020]">{feature.title}</h3>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#14b8a6]/10 text-[#14b8a6]">
                      {feature.category}
                    </span>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#666666]" />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-6 pb-6">
                        {/* Description */}
                        <p className="text-[#666666] mb-5 pl-16">{feature.description}</p>

                        {/* Preview Area */}
                        <div className="ml-16 bg-[#F5F3F0] rounded-xl p-5">
                          <PreviewElement type={feature.preview} />
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
