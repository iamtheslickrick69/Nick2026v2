"use client"

import { motion } from "framer-motion"

export default function IPhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      {/* iPhone Frame */}
      <div className="relative w-[280px] md:w-[320px] mx-auto">
        {/* Outer device bezel */}
        <div className="relative bg-[#1d1d1f] rounded-[3rem] p-3 shadow-2xl">
          {/* Screen */}
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-black/5 to-transparent z-10">
              <div className="flex items-center justify-between px-6 pt-2">
                <span className="text-xs font-semibold text-black">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 border border-black rounded-sm relative">
                    <div className="absolute inset-0.5 bg-black rounded-[1px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

            {/* SMS Conversation */}
            <div className="pt-14 px-4 pb-6 h-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B7F8E] to-[#E07850] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Coro</div>
                    <div className="text-xs text-gray-500">AI Agent</div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                {/* Coro's message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[75%] bg-gray-200 rounded-2xl rounded-tl-sm px-3 py-2">
                    <p className="text-xs text-gray-900 leading-relaxed">
                      How are things going with the new process?
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 block">Just now</span>
                  </div>
                </motion.div>

                {/* Employee response */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[75%] bg-[#1B7F8E] rounded-2xl rounded-tr-sm px-3 py-2">
                    <p className="text-xs text-white leading-relaxed">
                      Honestly, it's been rough. The team is confused.
                    </p>
                    <span className="text-[10px] text-white/70 mt-1 block text-right">Just now</span>
                  </div>
                </motion.div>

                {/* Coro follow-up */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.4 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[75%] bg-gray-200 rounded-2xl rounded-tl-sm px-3 py-2">
                    <p className="text-xs text-gray-900 leading-relaxed">
                      Tell me more — what's causing the confusion?
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 block">Just now</span>
                  </div>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.1, duration: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="bg-[#1B7F8E]/20 rounded-2xl rounded-tr-sm px-3 py-2 flex items-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-[#1B7F8E] rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-[#1B7F8E] rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-[#1B7F8E] rounded-full"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Input Bar (simplified) */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5">
                    <span className="text-xs text-gray-400">Text Message</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#1B7F8E] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notch reflection */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-sm" />
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B7F8E]/20 to-[#E07850]/20 rounded-[3rem] blur-2xl -z-10 opacity-50" />
      </div>

      {/* Floating animation */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
      />
    </motion.div>
  )
}
