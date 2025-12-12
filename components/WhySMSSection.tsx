"use client"

import { motion } from "framer-motion"
import { Smartphone, Zap, Users } from "lucide-react"

const cards = [
  {
    icon: Smartphone,
    title: "Your Team Is Already Drowning",
    body: "Your employees get 120+ emails a day, 50+ Slack messages, and alerts from 6 different tools. Adding another app means instant archive. SMS is where they already live—no download, no login, no asking them to check 'one more thing.'",
  },
  {
    icon: Zap,
    title: "Read Within 3 Minutes",
    body: "98% open rate. Read in 3 minutes on average. Compare that to email (20% open rate) or Slack (ignored after lunch). When your employees text Coro, they're not adding work. They're just texting.",
  },
  {
    icon: Users,
    title: "From the Warehouse to the C-Suite",
    body: "Whether your team is remote, frontline, warehouse, or corporate—everyone has a phone number. No app store approval needed. No IT setup required. Coro reaches your entire workforce, not just the people who check their laptop.",
  },
]

export default function WhySMSSection() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(224,120,80,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#14b8a6] font-semibold mb-4 font-mono"
          >
            The Channel
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#202020] mb-6"
          >
            One Channel. 98% Open Rate. Zero Friction.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#666666] max-w-2xl mx-auto"
          >
            SMS isn't a feature. It's the only channel that cuts through the noise.
          </motion.p>
        </div>

        {/* Three Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                borderColor: "rgba(224, 120, 80, 0.3)",
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-[#14b8a6]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#202020] mb-3">{card.title}</h3>

              {/* Body */}
              <p className="text-[#666666] leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stat Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-2 px-8 py-4 rounded-2xl bg-[#14b8a6]/5 border border-[#14b8a6]/20">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#666666]">Traditional surveys:</span>
              <span className="text-sm font-semibold text-[#202020]">30% response rate</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#666666]">SMS with Coro:</span>
              <span className="text-sm font-bold text-[#14b8a6]">70-85% response rate</span>
            </div>
            <p className="text-sm font-medium text-[#202020] mt-1">
              More voices. Better data. Fewer blind spots.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
