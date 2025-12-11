"use client"

import { motion } from "framer-motion"
import { ShieldAlert, AlertTriangle, TrendingDown, UserX, Briefcase, ArrowRight } from "lucide-react"
import { riskAlerts, getSeverityStyles } from "@/lib/dashboardData"

const getRiskIcon = (type: string) => {
  switch (type) {
    case "legal":
      return ShieldAlert
    case "retention":
      return UserX
    case "customer_churn":
      return TrendingDown
    case "project":
      return Briefcase
    default:
      return AlertTriangle
  }
}

export default function RiskRadarCard() {
  const criticalRisks = riskAlerts.filter((r) => r.severity === "critical")
  const warningRisks = riskAlerts.filter((r) => r.severity === "warning")
  const infoRisks = riskAlerts.filter((r) => r.severity === "info")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#202020]">Risk Radar</h3>
            <p className="text-xs text-[#666666]">Predictive intelligence</p>
          </div>
        </div>

        {/* Risk Counts */}
        <div className="flex items-center gap-3">
          {criticalRisks.length > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20"
            >
              <span className="text-sm font-bold text-red-600">{criticalRisks.length}</span>
              <span className="text-xs">🔴</span>
            </motion.div>
          )}
          {warningRisks.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-sm font-bold text-yellow-600">{warningRisks.length}</span>
              <span className="text-xs">🟡</span>
            </div>
          )}
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="space-y-3">
        {riskAlerts.map((risk, index) => {
          const Icon = getRiskIcon(risk.type)
          const styles = getSeverityStyles(risk.severity)

          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              className={`p-4 rounded-xl border-2 ${styles.border} ${styles.bg} cursor-pointer transition-all`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${styles.bg} border ${styles.border} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${styles.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{styles.icon}</span>
                    <h4 className={`text-sm font-bold ${styles.text}`}>{risk.title}</h4>
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed">{risk.description}</p>
                </div>
              </div>

              {/* Signals */}
              {risk.signals && risk.signals.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {risk.signals.map((signal, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#666666] mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-[#666666]">{signal}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#666666]">Detected</span>
                  <span className="text-xs font-semibold text-[#202020]">
                    {risk.detectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                {risk.affectedCount > 0 && (
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-bold ${styles.text}`}>{risk.affectedCount}</span>
                    <span className="text-xs text-[#666666]">affected</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
        >
          View All Risks
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
