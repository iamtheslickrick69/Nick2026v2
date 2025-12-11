import type React from "react"
import type { Metadata } from "next"
import { Figtree, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CoroProvider } from "@/contexts/CoroContext"
import { CoroOrb } from "@/components/coro/CoroOrb"
import { CoroChat } from "@/components/coro/CoroChat"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "LoopSync - Employee Feedback Platform",
  description: "Transform employee feedback into actionable insights with AI-powered analysis",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${figtree.variable} ${geistMono.variable} font-sans antialiased`}>
        <CoroProvider>
          {children}
          <CoroOrb />
          <CoroChat />
          <Analytics />
        </CoroProvider>
      </body>
    </html>
  )
}
