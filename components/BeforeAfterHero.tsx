"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, ClipboardList, UserX, MessageSquare, Brain, Zap } from "lucide-react"

interface BeforeAfterHeroProps {
  onOpenContact?: () => void
}

export default function BeforeAfterHero({ onOpenContact }: BeforeAfterHeroProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-16">
      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        {/* Hero Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold text-[#14b8a6] uppercase tracking-widest">
              Introducing LoopSync
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#202020] mb-8 leading-[1.05] tracking-tight max-w-5xl mx-auto">
            The Distance Between
            <br />
            <span className="bg-gradient-to-r from-[#14b8a6] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
              Leadership and Reality
            </span>
            <br />
            Just Disappeared.
          </h1>

          <p className="text-xl md:text-2xl text-[#666666] font-light max-w-3xl mx-auto leading-relaxed mb-3">
            <span className="font-semibold text-[#202020]">Coro</span> is the AI agent that closes the gap.
          </p>

          <p className="text-lg text-[#999999] max-w-2xl mx-auto">
            Real conversations with every employee. Real insights to leadership. All via text.
          </p>
        </motion.div>

        {/* The Revolution: Old vs New */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#202020] mb-3">The Revolution</h2>
            <p className="text-lg text-[#666666]">Old HR tools vs. LoopSync + Coro</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* OLD WAYS */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-[#E5E5E5]" />
                <h3 className="text-sm font-semibold text-[#999999] uppercase tracking-widest">The Old Way</h3>
                <div className="h-px flex-1 bg-[#E5E5E5]" />
              </div>

              {/* Old Way 1 */}
              <div className="flex gap-4 items-start p-5 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA]">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#999999]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#202020] mb-1.5">Spam Emails Nobody Reads</h4>
                  <p className="text-sm text-[#666666] font-light">
                    "Please complete this 47-question survey by EOD Friday."
                  </p>
                </div>
              </div>

              {/* Old Way 2 */}
              <div className="flex gap-4 items-start p-5 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA]">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-[#999999]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#202020] mb-1.5">Anonymous Survey Forms</h4>
                  <p className="text-sm text-[#666666] font-light">
                    Quarterly check-ins with canned questions. Results in 6 weeks.
                  </p>
                </div>
              </div>

              {/* Old Way 3 */}
              <div className="flex gap-4 items-start p-5 border border-[#E5E5E5] rounded-lg bg-[#FAFAFA]">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                  <UserX className="w-5 h-5 text-[#999999]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#202020] mb-1.5">Exit Interviews (Too Late)</h4>
                  <p className="text-sm text-[#666666] font-light">
                    Find out what went wrong after they've already quit.
                  </p>
                </div>
              </div>
            </div>

            {/* NEW WAYS */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]" />
                <h3 className="text-sm font-semibold text-[#14b8a6] uppercase tracking-widest">With LoopSync</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6]" />
              </div>

              {/* New Way 1 */}
              <div className="flex gap-4 items-start p-5 border-2 border-[#14b8a6]/30 rounded-lg bg-gradient-to-br from-[#14b8a6]/5 to-[#06b6d4]/5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#202020] mb-1.5">SMS Conversations</h4>
                  <p className="text-sm text-[#666666] font-light">
                    Coro texts employees naturally. 98% open rate. Zero friction.
                  </p>
                </div>
              </div>

              {/* New Way 2 */}
              <div className="flex gap-4 items-start p-5 border-2 border-[#14b8a6]/30 rounded-lg bg-gradient-to-br from-[#14b8a6]/5 to-[#06b6d4]/5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#202020] mb-1.5">AI Pattern Detection</h4>
                  <p className="text-sm text-[#666666] font-light">
                    Coro surfaces trends across 100s of conversations instantly.
                  </p>
                </div>
              </div>

              {/* New Way 3 */}
              <div className="flex gap-4 items-start p-5 border-2 border-[#14b8a6]/30 rounded-lg bg-gradient-to-br from-[#14b8a6]/5 to-[#06b6d4]/5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#202020] mb-1.5">Real-Time Action</h4>
                  <p className="text-sm text-[#666666] font-light">
                    Fix issues in days, not quarters. Prevent turnover before it happens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={onOpenContact}
            className="px-12 py-6 bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white text-lg font-semibold hover:shadow-2xl hover:shadow-[#14b8a6]/30 transition-all duration-200 inline-flex items-center gap-3 group rounded-lg"
          >
            See Coro in Action
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-[#999999] mt-4">No credit card required • 2 min demo</p>
        </motion.div>
      </div>
    </section>
  )
}
