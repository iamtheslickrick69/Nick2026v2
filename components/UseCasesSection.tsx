"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, TrendingDown, UserX, MessageCircle, XCircle, CheckCircle, MoveHorizontal } from "lucide-react"

const useCases = [
  {
    icon: AlertTriangle,
    title: "Harassment Crisis",
    before: {
      title: "Without LoopSync",
      description: "Anonymous harassment claim. No paper trail. No pattern detection. No early warning.",
      stat: "$200K+",
      statLabel: "Avg. lawsuit cost",
      problems: ["No documentation", "Fear of retaliation", "Delayed reporting", "Pattern blindness"],
    },
    after: {
      title: "With LoopSync",
      description: "Full conversation history. Timestamped evidence. Pattern detection alerts. Early intervention.",
      stat: "72 hrs",
      statLabel: "Average detection time",
      solutions: ["Complete audit trail", "Anonymous reporting", "Real-time alerts", "Pattern recognition"],
    },
  },
  {
    icon: TrendingDown,
    title: "Turnover Risk",
    before: {
      title: "Without LoopSync",
      description: "Top performers quietly disengage. Exit interviews reveal problems too late. Culture issues hidden.",
      stat: "$30K+",
      statLabel: "Replacement cost per employee",
      problems: ["Silent disengagement", "Late detection", "Lost tribal knowledge", "Cascading exits"],
    },
    after: {
      title: "With LoopSync",
      description:
        "Sentiment tracking detects shifts. Early retention interventions. Issues surface before resignation.",
      stat: "6 months",
      statLabel: "Earlier detection window",
      solutions: ["Real-time sentiment", "Proactive outreach", "Root cause visibility", "Retention interventions"],
    },
  },
  {
    icon: UserX,
    title: "Toxic Manager",
    before: {
      title: "Without LoopSync",
      description: "Annual reviews mask ongoing issues. 'Results-driven' manager burns out entire team.",
      stat: "20-50%",
      statLabel: "Team turnover rate",
      problems: ["Delayed feedback", "Fear-based culture", "Team burnout", "Talent exodus"],
    },
    after: {
      title: "With LoopSync",
      description:
        "Continuous feedback surfaces truth. Leadership sees problems early. Manager coaching or reassignment.",
      stat: "2 weeks",
      statLabel: "Average intervention time",
      solutions: ["Continuous feedback", "Pattern visibility", "Early coaching", "Team protection"],
    },
  },
  {
    icon: MessageCircle,
    title: "Broken Trust",
    before: {
      title: "Without LoopSync",
      description: "Employees share feedback, hear nothing back. Trust erodes. Survey participation drops to 12%.",
      stat: "73%",
      statLabel: "Don't believe feedback matters",
      problems: ["Black hole surveys", "Zero visibility", "Broken promises", "Cynicism grows"],
    },
    after: {
      title: "With LoopSync",
      description: "Action Tracker shows progress. Employees see their voice matters. Participation and trust rebuild.",
      stat: "85%+",
      statLabel: "Participation rate",
      solutions: ["Visible progress", "Closed-loop system", "Accountability tracking", "Trust rebuilt"],
    },
  },
]

export default function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const activeCase = useCases[activeIndex]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F5F3F0]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(224,120,80,0.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs uppercase tracking-widest text-[#E07850] font-bold mb-4 font-mono"
          >
            Real Problems, Real Solutions
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#202020] mb-5"
          >
            The Crises LoopSync Prevents
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#666666] max-w-3xl mx-auto"
          >
            {"These aren't hypotheticals. These are the problems that keep HR leaders up at night."}
          </motion.p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {useCases.map((useCase, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300
                ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white shadow-xl shadow-[#E07850]/30"
                    : "bg-white border-2 border-[#E5E5E5] text-[#666666] hover:text-[#202020] hover:border-[#E07850]/30 hover:shadow-md"
                }
              `}
            >
              <useCase.icon className="w-5 h-5" />
              <span className="text-sm">{useCase.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative bg-white border-2 border-[#E5E5E5] rounded-3xl overflow-hidden shadow-2xl">
            {/* Slider Container */}
            <div className="relative" style={{ height: "480px" }}>
              <AnimatePresence>
                {/* BEFORE Side (Left) - Red */}
                <motion.div
                  key={`before-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/80"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <div className="h-full p-8 md:p-12 flex flex-col">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex items-center gap-4 mb-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <XCircle className="w-7 h-7 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#202020]">{activeCase.before.title}</h3>
                        <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">The Problem</p>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-base text-[#202020]/80 mb-8 leading-relaxed font-medium"
                    >
                      {activeCase.before.description}
                    </motion.p>

                    {/* Problem List */}
                    <div className="space-y-3 mb-auto">
                      {activeCase.before.problems.map((problem, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-[#202020] font-medium">{problem}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stat */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="pt-6 border-t-2 border-red-200 mt-8"
                    >
                      <div className="text-5xl font-black text-red-600 mb-1">{activeCase.before.stat}</div>
                      <div className="text-sm text-[#202020]/70 font-semibold">{activeCase.before.statLabel}</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* AFTER Side (Right) - Green */}
                <motion.div
                  key={`after-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100/80"
                  style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                >
                  <div className="h-full p-8 md:p-12 flex flex-col">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex items-center gap-4 mb-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#202020]">{activeCase.after.title}</h3>
                        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">The Solution</p>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-base text-[#202020]/80 mb-8 leading-relaxed font-medium"
                    >
                      {activeCase.after.description}
                    </motion.p>

                    {/* Solution List */}
                    <div className="space-y-3 mb-auto">
                      {activeCase.after.solutions.map((solution, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-[#202020] font-medium">{solution}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stat */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="pt-6 border-t-2 border-emerald-200 mt-8"
                    >
                      <div className="text-5xl font-black text-emerald-600 mb-1">{activeCase.after.stat}</div>
                      <div className="text-sm text-[#202020]/70 font-semibold">{activeCase.after.statLabel}</div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Divider */}
              <motion.div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#E07850] via-blue-500 to-[#E07850] z-10 shadow-xl"
                style={{ left: `${sliderPosition}%` }}
                animate={{ left: `${sliderPosition}%` }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              >
                {/* Drag Handle */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    absolute top-1/2 left-1/2 
                    transform -translate-x-1/2 -translate-y-1/2 
                    w-16 h-16 
                    bg-gradient-to-br from-[#E07850] to-[#C9643D]
                    rounded-full 
                    flex items-center justify-center 
                    shadow-2xl 
                    cursor-grab active:cursor-grabbing 
                    border-4 border-white
                  "
                >
                  <MoveHorizontal className="w-7 h-7 text-white" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </div>

            {/* Hidden Range Input for Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
              style={{ touchAction: "none" }}
            />
          </div>

          {/* Helper Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm font-medium text-[#666666] mt-5 flex items-center justify-center gap-2"
          >
            <MoveHorizontal className="w-4 h-4" />
            Drag the slider to compare before and after
          </motion.p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#202020] font-medium mb-6">Which crisis are you trying to prevent?</p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2, borderRadius: "12px" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.455, 0.03, 0.515, 0.955] }}
            className="
              px-10 py-4 
              bg-gradient-to-r from-[#E07850] to-[#C9643D]
              text-white text-lg font-bold 
              rounded-xl 
              shadow-xl shadow-[#E07850]/30 
              hover:shadow-2xl hover:shadow-[#E07850]/40 
              transition-all
            "
          >
            {"Book a Demo →"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
