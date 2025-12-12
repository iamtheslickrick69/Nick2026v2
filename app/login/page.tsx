"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuthStore } from "@/lib/auth"
import { Lock, Mail, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const quickLogin = async (role: string) => {
    setLoading(true)
    await login(`${role}@loopsync.com`, "demo")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14b8a6] via-[#06b6d4] to-[#3b82f6] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#14b8a6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#06b6d4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 right-40 w-72 h-72 bg-[#3b82f6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] mb-4">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-[#202020] mb-2">Welcome to LoopSync</h1>
            <p className="text-sm text-[#666666]">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#666666]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full pl-10"
                  placeholder="admin@loopsync.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#202020] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[#666666]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-10"
                  placeholder="Enter any password for demo"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full glass-button-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E5E5]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-[#666666]">Or quick login as</span>
            </div>
          </div>

          {/* Quick Login Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'admin', label: 'Admin', color: 'from-[#14b8a6] to-[#06b6d4]' },
              { role: 'manager', label: 'Manager', color: 'from-[#06b6d4] to-[#3b82f6]' },
              { role: 'employee', label: 'Employee', color: 'from-[#3b82f6] to-[#8b5cf6]' }
            ].map((item) => (
              <button
                key={item.role}
                onClick={() => quickLogin(item.role)}
                className="relative overflow-hidden px-3 py-2 rounded-xl border border-[#E5E5E5] hover:border-[#14b8a6] transition-all group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <span className="relative text-xs font-medium text-[#202020]">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Demo Mode</p>
                <p className="text-xs text-amber-700 mt-1">
                  This is a demonstration. Use any email ending with @loopsync.com or click a quick login button.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-[#666666] hover:text-[#14b8a6] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}