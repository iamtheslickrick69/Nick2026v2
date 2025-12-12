"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"

interface LoopSyncNavbarProps {
  onOpenContact?: () => void
}

const navigationLinks = [
  { name: "Home", href: "#home", isActive: true },
  { name: "Dashboard", href: "/dashboard", isActive: false },
]

export const LoopSyncNavbar = ({ onOpenContact }: LoopSyncNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 100, 1)
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isScrolled = scrollProgress > 0

  const navScale = 1 - scrollProgress * 0.02
  const navWidth = 628 + scrollProgress * 44

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith("/")) {
      window.location.href = href
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleCtaClick = () => {
    setIsMobileMenuOpen(false)
    onOpenContact?.()
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <div
          className="
            flex items-center justify-between
            h-[64px] px-6 md:px-8
            bg-white/98 backdrop-blur-xl
            border-b border-[#E5E5E5]
            shadow-sm
          "
        >
          <button onClick={() => handleLinkClick("#home")} className="flex items-center gap-2.5 shrink-0 group">
            {/* Clean Professional Logo */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>

            {/* LoopSync Wordmark with Gradient */}
            <span className="text-[17px] font-bold bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] bg-clip-text text-transparent">
              LoopSync
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors duration-200
                  ${link.isActive ? "text-[#202020]" : "text-[#666666] hover:text-[#202020]"}
                `}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleCtaClick}
            className="hidden md:flex items-center gap-2 bg-[#14b8a6] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0d9488] transition-colors group"
          >
            <span>Connect</span>
            <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
          </button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#202020] hover:text-[#14b8a6] transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-2 overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-[#06b6d4]/20 rounded-2xl shadow-lg shadow-[#14b8a6]/5 p-4">
                <div className="space-y-1">
                  {navigationLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.href)}
                      className={`
                        block w-full text-left px-4 py-3 rounded-xl text-base transition-colors duration-200
                        ${link.isActive ? "text-[#202020] bg-[#F5F3F0]" : "text-[#666666] hover:text-[#202020] hover:bg-[#F5F3F0]"}
                      `}
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                  <motion.button
                    onClick={handleCtaClick}
                    whileHover={{ borderRadius: "16px" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.455, 0.03, 0.515, 0.955] }}
                    className="w-full flex items-center justify-center gap-2 bg-[#14b8a6] text-white px-5 py-3 rounded-full text-base font-medium shadow-lg shadow-[#14b8a6]/25"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    <span>Connect</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}

export default LoopSyncNavbar
