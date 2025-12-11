"use client"

import { motion } from "framer-motion"
import { Lock, Shield, FileX, Users } from "lucide-react"

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All messages are encrypted in transit and at rest using AES-256 encryption standards.",
    color: "#1B7F8E",
  },
  {
    icon: Shield,
    title: "Anonymous by Design",
    description: "Employee identities are never linked to feedback. True anonymity builds trust.",
    color: "#E07850",
  },
  {
    icon: FileX,
    title: "Zero Data Retention",
    description: "Raw message content is processed and discarded. Only aggregated insights are stored.",
    color: "#06b6d4",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular permissions ensure only authorized personnel see relevant insights.",
    color: "#1B7F8E",
  },
]

export function SecuritySection() {
  return (
    <section className="relative py-24 px-6 md:px-8 bg-white overflow-hidden">
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1B7F8E 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-tight uppercase mb-6"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              background: "rgba(27, 127, 142, 0.1)",
              color: "#1B7F8E",
            }}
          >
            <Shield className="w-3.5 h-3.5" />
            Enterprise Security
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
          >
            Security That Earns
            <br />
            <span style={{ color: "#E07850" }}>Employee Trust</span>
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
          >
            Built from the ground up with privacy and security as core principles, not afterthoughts.
          </p>
        </motion.div>

        {/* 2x2 / 4-col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-[#E5E5E5] bg-white transition-all duration-300 hover:border-transparent hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Hover gradient border effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
                }}
              />

              {/* Icon with wiggle animation on hover */}
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${feature.color}15` }}
                whileHover={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </motion.div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
              >
                {feature.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* SOC 2 Footer */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-[#E5E5E5]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(27, 127, 142, 0.1)" }}
            >
              <Shield className="w-6 h-6" style={{ color: "#1B7F8E" }} />
            </div>
            <div className="text-left">
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
              >
                SOC 2 Type II Compliant
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
              >
                Independently audited security controls
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-[#E5E5E5]" />

          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(224, 120, 80, 0.1)" }}
            >
              <Lock className="w-6 h-6" style={{ color: "#E07850" }} />
            </div>
            <div className="text-left">
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
              >
                GDPR & CCPA Ready
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
              >
                Full regulatory compliance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SecuritySection
