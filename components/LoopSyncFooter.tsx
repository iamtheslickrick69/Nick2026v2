"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin, Github } from "lucide-react"

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function LoopSyncFooter() {
  return (
    <footer className="relative py-16 px-6 md:px-8 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Orb Logo */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="relative w-10 h-10 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #E07850, #1B7F8E, #06b6d4)",
                }}
                animate={{
                  background: [
                    "linear-gradient(135deg, #E07850, #1B7F8E, #06b6d4)",
                    "linear-gradient(225deg, #1B7F8E, #06b6d4, #E07850)",
                    "linear-gradient(315deg, #06b6d4, #E07850, #1B7F8E)",
                    "linear-gradient(135deg, #E07850, #1B7F8E, #06b6d4)",
                  ],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="absolute inset-1 rounded-full bg-white/20 backdrop-blur-sm" />
              </motion.div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
              >
                LoopSync
              </span>
            </div>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
            >
              Continuous employee feedback that actually drives change. Anonymous, real-time, actionable.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-150"
                  style={{
                    borderColor: "#E5E5E5",
                    color: "#666666",
                  }}
                  whileHover={{
                    borderColor: "#202020",
                    color: "#202020",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4
              className="text-sm font-semibold mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
            >
              {footerLinks.product.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#E07850]"
                    style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4
              className="text-sm font-semibold mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
            >
              {footerLinks.company.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#E07850]"
                    style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4
              className="text-sm font-semibold mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#202020" }}
            >
              {footerLinks.legal.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#E07850]"
                    style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm" style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}>
            © {new Date().getFullYear()} LoopSync. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm transition-colors hover:text-[#E07850]"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:text-[#E07850]"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:text-[#E07850]"
              style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif", color: "#666666" }}
            >
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default LoopSyncFooter
