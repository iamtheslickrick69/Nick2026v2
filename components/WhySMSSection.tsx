"use client"

import { motion } from "framer-motion"
import { Smartphone, Zap, Users } from "lucide-react"

const cards = [
  {
    icon: Smartphone,
    title: "Not Another App",
    body: "No app fatigue. No passwords. Coro meets employees and customers in their native messaging app. Zero friction, maximum participation.",
  },
  {
    icon: Zap,
    title: "98% Open Rate",
    body: "SMS gets read within 3 minutes on average. When anyone texts Coro, they're not adding work. They're just texting.",
  },
  {
    icon: Users,
    title: "True Accessibility",
    body: "Everyone has a phone. SMS reaches your entire workforce AND customer base — warehouse, remote, frontline, corporate, or customer. No one left out.",
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
            className="text-3xl md:text-5xl font-bold text-[#202020] mb-6"
          >
            Why SMS? Because Everyone Already Has It.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#666666] max-w-2xl mx-auto"
          >
            No app downloads. No passwords. No training. Just text.
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
              <div className="w-12 h-12 rounded-xl bg-[#E07850]/10 flex items-center justify-center mb-5">
                <card.icon className="w-6 h-6 text-[#E07850]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#202020] mb-3">{card.title}</h3>

              {/* Body */}
              <p className="text-[#666666] leading-relaxed">{card.body}</p>
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
