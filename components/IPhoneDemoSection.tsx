"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function IPhoneDemoSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Colorful gradient background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Subtle brand color gradient */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1B7F8E] via-[#2d5a66] to-[#3a3a3a]" />

        {/* Accent gradient overlay for depth */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#E07850]/10 via-transparent to-[#06b6d4]/10" />

        {/* Uncomment below for actual video */}
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/demo-bg.mp4" type="video/mp4" />
        </video> */}
      </div>

      {/* Lighter overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.1, 0, 0.1, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
              >
                They Fear AI Will Replace Them.
                <br />
                <span className="text-[#E07850]">We Built AI to Hear Them.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.1, 0, 0.1, 1] }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
              >
                Coro gives employees what they've been asking for: a voice without fear, and a guarantee that someone's
                actually listening.
              </motion.p>
            </div>

            {/* Right Column - iPhone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
              className="flex justify-center lg:justify-end"
            >
              {/* iPhone Frame */}
              <div className="relative">
                {/* Phone shadow/glow */}
                <div className="absolute inset-0 blur-3xl bg-[#E07850]/20 rounded-[60px] transform scale-90" />

                {/* iPhone shell */}
                <div
                  className="
                  relative
                  w-[280px] md:w-[320px]
                  h-[570px] md:h-[650px]
                  bg-gray-900
                  rounded-[50px]
                  p-3
                  shadow-2xl
                  border border-gray-700
                "
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-2xl z-20" />

                  {/* Side buttons */}
                  <div className="absolute right-[-2px] top-[120px] w-[3px] h-[60px] bg-gray-700 rounded-l" />
                  <div className="absolute left-[-2px] top-[100px] w-[3px] h-[30px] bg-gray-700 rounded-r" />
                  <div className="absolute left-[-2px] top-[140px] w-[3px] h-[50px] bg-gray-700 rounded-r" />

                  {/* Screen */}
                  <div
                    className="
                    relative
                    w-full h-full
                    bg-white
                    rounded-[40px]
                    overflow-hidden
                  "
                  >
                    {/* Demo content area */}
                    <div className="p-4 h-full flex flex-col">
                      {/* Status bar mockup */}
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4 px-2 pt-4">
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 bg-gray-300 rounded-sm" />
                          <div className="w-4 h-2 bg-gray-300 rounded-sm" />
                          <div className="w-6 h-2 bg-green-500 rounded-sm" />
                        </div>
                      </div>

                      {/* Chat header */}
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E07850] to-[#C9643D] flex items-center justify-center">
                          <span className="text-white text-sm font-bold">C</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Coro</div>
                          <div className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            Online
                          </div>
                        </div>
                      </div>

                      {/* Chat messages */}
                      <div className="flex-1 py-4 space-y-3 overflow-hidden">
                        {/* Coro message */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                          className="flex gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E07850] to-[#C9643D] flex-shrink-0" />
                          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                            <p className="text-sm text-gray-800">Hey! I'm Coro. What's on your mind today?</p>
                          </div>
                        </motion.div>

                        {/* User message */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 }}
                          className="flex justify-end"
                        >
                          <div className="bg-[#E07850] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                            <p className="text-sm text-white">I need to share something about my manager...</p>
                          </div>
                        </motion.div>

                        {/* Coro typing indicator */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.1 }}
                          className="flex gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E07850] to-[#C9643D] flex-shrink-0" />
                          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                            <div className="flex gap-1">
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Input area */}
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-full border border-gray-200">
                        <input
                          type="text"
                          placeholder="Message Coro..."
                          className="flex-1 bg-transparent text-sm px-3 py-2 outline-none"
                          readOnly
                        />
                        <button className="w-8 h-8 bg-[#E07850] rounded-full flex items-center justify-center">
                          <ArrowUp className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Helper Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-sm text-white/60 mt-12"
          >
            Choose a role above and select a conversation starter to explore
          </motion.p>
        </div>
      </div>
    </section>
  )
}
