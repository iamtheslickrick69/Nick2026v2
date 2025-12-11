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
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
        style={{
          maxWidth: `${navWidth}px`,
          transform: `scale(${navScale})`,
          transition: "all 500ms ease-out",
        }}
      >
        <div
          className={`
            rounded-full flex items-center justify-between
            h-[55px] md:h-[63px] px-5 md:px-7
            transition-all duration-500 ease-out
            ${
              isScrolled
                ? "bg-white/95 backdrop-blur-xl border border-[#E5E5E5] shadow-lg"
                : "bg-white/10 backdrop-blur-md border border-white/20"
            }
          `}
        >
          <button onClick={() => handleLinkClick("#home")} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07850] via-[#1B7F8E] to-[#06b6d4] animate-pulse" />
            <span
              className={`tracking-tight transition-colors ${isScrolled ? "text-[#202020]" : "text-white"}`}
              style={{
                fontFamily: "Figtree, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              LoopSync
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`
                  px-4 py-2 text-base transition-colors duration-200
                  ${
                    isScrolled
                      ? link.isActive
                        ? "text-[#202020]"
                        : "text-[#666666] hover:text-[#202020]"
                      : link.isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }
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

          <motion.button
            onClick={handleCtaClick}
            whileHover={{
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(224, 120, 80, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.15,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            className="hidden md:flex items-center gap-2 bg-[#E07850] text-white px-5 py-2.5 rounded-full text-base font-medium group"
            style={{
              fontFamily: "Figtree, sans-serif",
              fontWeight: 500,
            }}
          >
            <span>Connect</span>
            <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
          </motion.button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#202020] hover:text-[#E07850] transition-colors duration-200"
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
              <div className="bg-white/95 backdrop-blur-xl border border-[#1B7F8E]/20 rounded-2xl shadow-lg shadow-[#E07850]/5 p-4">
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
                    className="w-full flex items-center justify-center gap-2 bg-[#E07850] text-white px-5 py-3 rounded-full text-base font-medium shadow-lg shadow-[#E07850]/25"
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
