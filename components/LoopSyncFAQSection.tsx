"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, HelpCircle } from "lucide-react"

const faqItems = [
  {
    question: "How does LoopSync protect employee anonymity?",
    answer:
      "LoopSync uses end-to-end encryption and a zero-knowledge architecture. Messages are processed by AI without ever linking to employee identities. Even LoopSync staff cannot see who sent what. We aggregate insights at minimum group sizes to prevent identification through deduction.",
  },
  {
    question: "What if employees abuse the anonymous system?",
    answer:
      "Our AI filters inappropriate content, spam, and bad-faith messages before they reach dashboards. The system is designed to surface legitimate workplace concerns, not enable harassment or false accusations. Patterns of abuse are detected and addressed without compromising anonymity.",
  },
  {
    question: "How is this different from regular employee surveys?",
    answer:
      "Traditional surveys are periodic snapshots that miss real-time issues. LoopSync enables continuous, conversational feedback via SMS—the channel employees already use daily. Response rates jump from typical 30% to over 70%, and insights arrive in real-time, not months later.",
  },
  {
    question: "What size companies benefit most from LoopSync?",
    answer:
      "LoopSync works best for companies with 50+ employees where leadership can't have direct conversations with everyone. We're especially effective for organizations with distributed teams, frontline workers, or high-turnover roles where traditional engagement methods fail.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most companies are fully operational within 2 weeks. We handle technical setup, employee communication templates, and manager training. Our customer success team guides you through launch and helps establish feedback response protocols.",
  },
  {
    question: "Can managers retaliate against employees?",
    answer:
      "No. The system is architecturally designed to prevent this. Managers see aggregated themes and sentiment trends, never individual messages. Insights are presented at team or department levels with minimum thresholds that make identification impossible.",
  },
]

export function LoopSyncFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-24 px-6 md:px-8" style={{ background: "#F5F3F0" }}>
      <div className="max-w-4xl mx-auto">
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
              background: "rgba(224, 120, 80, 0.1)",
              color: "#14b8a6",
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
          >
            Questions?
            <br />
            <span style={{ color: "#14b8a6" }}>We've Got Answers</span>
          </h2>
        </motion.div>

        {/* FAQ Container */}
        <motion.div
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
          style={{ border: "1px solid #E5E5E5" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className={index !== faqItems.length - 1 ? "border-b border-[#E5E5E5]" : ""}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left transition-opacity hover:opacity-70"
              >
                <span
                  className="text-lg font-medium pr-8"
                  style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
                >
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-shrink-0"
                >
                  <Plus className="w-6 h-6" style={{ color: "#202020" }} strokeWidth={1.5} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-6 pr-12 leading-relaxed"
                      style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className="text-sm mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
          >
            Still have questions?
          </p>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-150"
            style={{
              fontFamily: "var(--font-figtree), Figtree, sans-serif",
              color: "#14b8a6",
              border: "1px solid #14b8a6",
            }}
            whileHover={{
              background: "rgba(224, 120, 80, 0.1)",
              borderRadius: "16px",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default LoopSyncFAQSection
