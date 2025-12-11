"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import {
  AlertTriangle,
  Users,
  DollarSign,
  Scale,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Clock,
  Target,
  Shield,
  XCircle,
} from "lucide-react"

const riskCategories = [
  {
    id: "retention",
    name: "Retention Risk",
    icon: Users,
    score: 72,
    trend: "rising",
    severity: "high",
    description: "3 high-performers showing disengagement patterns",
    predictedImpact: "$90K potential replacement cost",
    signals: [
      { signal: "Reduced engagement in feedback", confidence: 89 },
      { signal: "Sentiment drop over 2 weeks", confidence: 84 },
      { signal: "Decreased participation in team activities", confidence: 76 },
    ],
    recommendations: [
      "Schedule stay interviews with flagged employees",
      "Review compensation against market rates",
      "Assess workload distribution in affected teams",
    ],
  },
  {
    id: "legal",
    name: "Legal/Compliance",
    icon: Scale,
    score: 45,
    trend: "stable",
    severity: "medium",
    description: "Ongoing harassment concern requiring attention",
    predictedImpact: "Potential $200K+ exposure",
    signals: [
      { signal: "Pattern of concerning feedback from Sales team", confidence: 78 },
      { signal: "Multiple mentions of specific manager", confidence: 72 },
    ],
    recommendations: [
      "Escalate to HR for formal investigation",
      "Document all related feedback",
      "Consider interim protective measures",
    ],
  },
  {
    id: "burnout",
    name: "Burnout Risk",
    icon: AlertTriangle,
    score: 68,
    trend: "rising",
    severity: "high",
    description: "Engineering team showing elevated stress signals",
    predictedImpact: "Productivity decline + turnover risk",
    signals: [
      { signal: "Workload complaints increased 40%", confidence: 91 },
      { signal: "After-hours messaging sentiment negative", confidence: 85 },
      { signal: "PTO usage below average", confidence: 79 },
    ],
    recommendations: [
      "Review Q4 deadline feasibility",
      "Assess resource allocation",
      "Encourage PTO usage before year-end",
    ],
  },
  {
    id: "culture",
    name: "Culture Erosion",
    icon: Shield,
    score: 34,
    trend: "declining",
    severity: "low",
    description: "Trust metrics stable, minor concerns in Sales",
    predictedImpact: "Long-term engagement decline if unaddressed",
    signals: [
      { signal: "Slight decline in leadership trust", confidence: 65 },
      { signal: "Communication satisfaction dipping", confidence: 62 },
    ],
    recommendations: [
      "Increase leadership visibility",
      "Implement regular town halls",
      "Address communication gaps proactively",
    ],
  },
]

export default function RisksPage() {
  const [selectedRisk, setSelectedRisk] = useState(riskCategories[0])

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return { bg: "bg-red-50", border: "border-red-200", text: "text-red-600", dot: "bg-red-500" }
      case "medium":
        return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", dot: "bg-amber-500" }
      case "low":
        return { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", dot: "bg-emerald-500" }
      default:
        return { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-600", dot: "bg-gray-500" }
    }
  }

  const highRiskCount = riskCategories.filter((r) => r.severity === "high").length

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader title="Risk Radar" subtitle="Predictive risk assessment and early warning system" />

        <div className="p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
                <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                  High Priority
                </span>
              </div>
              <p className="text-3xl font-bold text-[#202020]">{highRiskCount}</p>
              <p className="text-sm text-[#666666]">High-Risk Areas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Clock size={20} className="text-amber-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#202020]">14 days</p>
              <p className="text-sm text-[#666666]">Avg Prediction Window</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B7F8E]/10 flex items-center justify-center">
                  <Target size={20} className="text-[#1B7F8E]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#202020]">87%</p>
              <p className="text-sm text-[#666666]">Prediction Accuracy</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-5 border border-[#E5E5E5]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <XCircle size={20} className="text-emerald-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#202020]">12</p>
              <p className="text-sm text-[#666666]">Risks Prevented (90 days)</p>
            </motion.div>
          </div>

          {/* Risk Categories + Detail */}
          <div className="grid grid-cols-12 gap-6">
            {/* Risk List */}
            <div className="col-span-12 lg:col-span-4 space-y-3">
              {riskCategories.map((risk, index) => {
                const styles = getSeverityStyles(risk.severity)
                const isSelected = selectedRisk.id === risk.id
                return (
                  <motion.button
                    key={risk.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    onClick={() => setSelectedRisk(risk)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? `${styles.bg} ${styles.border}`
                        : "bg-white border-[#E5E5E5] hover:border-[#E07850]/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? styles.bg : "bg-[#F5F3F0]"}`}
                      >
                        <risk.icon size={18} className={isSelected ? styles.text : "text-[#666666]"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[#202020]">{risk.name}</span>
                          <span className={`text-lg font-bold ${styles.text}`}>{risk.score}%</span>
                        </div>
                        <p className="text-xs text-[#666666] line-clamp-1">{risk.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                          <span className={`text-xs font-medium capitalize ${styles.text}`}>{risk.severity}</span>
                          <span className="text-xs text-[#9a9a9a]">•</span>
                          <span className="flex items-center gap-0.5 text-xs text-[#666666]">
                            {risk.trend === "rising" ? (
                              <TrendingUp size={10} className="text-red-500" />
                            ) : risk.trend === "declining" ? (
                              <TrendingDown size={10} className="text-emerald-500" />
                            ) : null}
                            {risk.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Risk Detail */}
            <div className="col-span-12 lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRisk.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-[#E5E5E5]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSeverityStyles(selectedRisk.severity).bg}`}
                        >
                          <selectedRisk.icon size={24} className={getSeverityStyles(selectedRisk.severity).text} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#202020]">{selectedRisk.name}</h3>
                          <p className="text-sm text-[#666666]">{selectedRisk.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-3xl font-bold ${getSeverityStyles(selectedRisk.severity).text}`}>
                          {selectedRisk.score}%
                        </p>
                        <p className="text-xs text-[#666666]">Risk Score</p>
                      </div>
                    </div>
                  </div>

                  {/* Predicted Impact */}
                  <div className="p-6 border-b border-[#E5E5E5] bg-[#F5F3F0]/50">
                    <div className="flex items-center gap-3">
                      <DollarSign size={18} className="text-[#E07850]" />
                      <span className="text-sm text-[#666666]">Predicted Impact:</span>
                      <span className="text-base font-semibold text-[#202020]">{selectedRisk.predictedImpact}</span>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="p-6 border-b border-[#E5E5E5]">
                    <h4 className="text-sm font-semibold text-[#202020] mb-4">Detection Signals</h4>
                    <div className="space-y-3">
                      {selectedRisk.signals.map((signal, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-sm text-[#202020]">{signal.signal}</p>
                          </div>
                          <div className="flex items-center gap-2 w-32">
                            <div className="flex-1 h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-[#1B7F8E] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${signal.confidence}%` }}
                                transition={{ duration: 0.5, delay: 0.1 * idx }}
                              />
                            </div>
                            <span className="text-xs font-medium text-[#202020]">{signal.confidence}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-[#202020] mb-4">Recommended Actions</h4>
                    <div className="space-y-2">
                      {selectedRisk.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F3F0] hover:bg-[#ECEAE6] transition-colors cursor-pointer group"
                        >
                          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-[#666666]">
                            {idx + 1}
                          </span>
                          <span className="flex-1 text-sm text-[#202020]">{rec}</span>
                          <ChevronRight
                            size={14}
                            className="text-[#9a9a9a] group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                      Take Action on This Risk
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
