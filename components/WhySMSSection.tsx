"use client"

import { motion } from "framer-motion"
import { Smartphone, Zap, Users } from "lucide-react"

const cards = [
  {
    icon: Smartphone,
    title: "No App Fatigue",
    body: (
      <>
        Everyone texts. Nobody downloads another app. Coro meets people where they already are — their native messaging
        app. Result: <span className="text-[#14b8a6] font-bold text-lg">98% engagement</span> vs. 30% for email.
      </>
    ),
  },
  {
    icon: Zap,
    title: "Read in 3 Minutes",
    body: (
      <>
        <span className="text-[#14b8a6] font-bold text-lg">98%</span> of text messages are opened within 3 minutes.
        Your feedback doesn't sit in an inbox. It gets seen, processed, and acted on — fast.
      </>
    ),
  },
  {
    icon: Users,
    title: "Everyone, Everywhere",
    body: (
      <>
        Warehouse workers. Remote teams. Frontline staff. Customers. SMS reaches{" "}
        <span className="text-[#14b8a6] font-bold text-lg">100%</span> of your people without requiring Wi-Fi, app
        store approval, or IT setup.
      </>
    ),
  },
]

const images = [
  { src: "/warehouse-worker-texting-on-phone.jpg", label: "Warehouse" },
  { src: "/office-professional-using-smartphone.jpg", label: "Office" },
  { src: "/remote-worker-at-home-texting.jpg", label: "Remote" },
  { src: "/frontline-retail-employee-with-phone.jpg", label: "Frontline" },
]

export default function WhySMSSection() {
  return (
    <section className="relative py-32 md:py-40 bg-gradient-to-br from-white via-[#14b8a6]/5 to-[#0891b2]/10 overflow-hidden">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(224,120,80,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ultra-subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
            className="text-xs uppercase tracking-widest text-[#E07850] font-semibold mb-4 font-mono"
          >
            The Channel
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] via-[#1B7F8E] to-[#0891b2] mb-6"
          >
            One Channel. 98% Open Rate. Zero Friction.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#202020] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            While your emails sit unread and your apps gather dust, SMS gets opened in 3 minutes. Every employee. Every
            customer. Every time.
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
                y: -12,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.25)",
                borderColor: "rgba(20, 184, 166, 0.5)",
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="relative overflow-hidden bg-gradient-to-br from-white via-[#14b8a6]/5 to-[#0891b2]/10 border border-[#14b8a6]/20 rounded-3xl p-10 shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0891b2] flex items-center justify-center mb-6 shadow-lg shadow-[#14b8a6]/30">
                <card.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-black text-[#14b8a6] mb-4">{card.title}</h3>

              {/* Body */}
              <div className="text-[#202020]/80 leading-relaxed text-base">{card.body}</div>
            </motion.div>
          ))}
        </div>

        {/* Image Grid Section */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center text-[#202020] mb-12"
        >
          See It In Action Across Your Organization
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-[#E5E5E5] shadow-md hover:shadow-xl transition-all"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.04) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 1px 1px 0, rgba(0, 0, 0, 0.04) 0 3px 3px -1.4px",
                }}
              >
                {/* Image */}
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.label}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Label */}
              <p className="text-center mt-3 text-sm font-medium text-[#666666]">{image.label}</p>
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
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#E07850]/5 border border-[#E07850]/20">
            <span className="text-sm text-[#666666]">Traditional surveys:</span>
            <span className="text-sm font-semibold text-[#202020]">30-40%</span>
            <span className="text-[#666666]">vs SMS:</span>
            <span className="text-sm font-bold text-[#E07850]">70-85%</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
