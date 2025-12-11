// Real dashboard data injection for Coro AI context
// This provides live data from the dashboard to make responses accurate

import { culturePulse, departmentHealth, actionItems, riskAlerts, recentFeedback } from "./dashboardData"

/**
 * Generate dynamic context from real dashboard data
 */
export function getDashboardContext(): string {
  // Culture Pulse metrics
  const culturePulseContext = `
**Current Culture Pulse Score:** ${culturePulse.currentScore}/100
**Trend:** ${culturePulse.trend === "up" ? "↗️ Improving" : "↘️ Declining"} (${culturePulse.change > 0 ? "+" : ""}${culturePulse.change} from last week)
**Last 7 Days:** ${culturePulse.last7Days.join(", ")}
`

  // Department Health breakdown
  const deptHealthContext = departmentHealth
    .map(
      (dept) => `
- **${dept.name}:** ${dept.score}/100 (${dept.change > 0 ? "+" : ""}${dept.change} from last week)
  ${dept.score < 70 ? "⚠️ AT RISK" : dept.score >= 85 ? "✅ EXCELLENT" : "✓ Healthy"}
`
    )
    .join("")

  // Risk Alerts
  const risksContext = riskAlerts
    .map(
      (risk) => `
- **${risk.title}** (${risk.severity.toUpperCase()} - ${risk.affectedCount} affected)
  Detected: ${risk.detectedDate.toLocaleDateString()}
  Signals: ${risk.signals.join(", ")}
`
    )
    .join("")

  // Action Items Summary
  const actionsContext = `
**Total Actions:** ${actionItems.length}
- Pending: ${actionItems.filter((a) => a.status === "pending").length}
- In Progress: ${actionItems.filter((a) => a.status === "in_progress").length}
- Completed: ${actionItems.filter((a) => a.status === "completed").length}
`

  // Recent Feedback samples (last 5)
  const feedbackContext = recentFeedback
    .slice(0, 5)
    .map(
      (fb) => `
- [${fb.source === "employee" ? "Employee" : "Customer"}] ${fb.sentiment.toUpperCase()} - "${fb.message.substring(0, 100)}${fb.message.length > 100 ? "..." : ""}"
  Priority: ${fb.priority} | Tags: ${fb.tags.join(", ")}
`
    )
    .join("")

  // Compile full context
  return `
# LIVE DASHBOARD DATA (${new Date().toLocaleString()})

## Culture Pulse
${culturePulseContext}

## Department Health
${deptHealthContext}

## Active Risks
${risksContext}

## Action Tracker
${actionsContext}

## Recent Feedback (Last 5)
${feedbackContext}

---
Use this REAL data to provide accurate, specific insights. Reference actual numbers, trends, and feedback when answering questions.
`
}

/**
 * Get specific data based on user query intent
 */
export function getContextForQuery(query: string): string {
  const lowerQuery = query.toLowerCase()

  // Burnout/stress queries
  if (lowerQuery.includes("burnout") || lowerQuery.includes("stress") || lowerQuery.includes("workload")) {
    const burnoutFeedback = recentFeedback.filter(
      (fb) =>
        fb.tags.includes("workload") ||
        fb.tags.includes("burnout") ||
        fb.message.toLowerCase().includes("stress") ||
        fb.message.toLowerCase().includes("overwhelmed")
    )

    return `
**Burnout/Stress Analysis:**
Found ${burnoutFeedback.length} recent feedback items mentioning stress/workload:
${burnoutFeedback
  .slice(0, 3)
  .map((fb) => `- ${fb.department}: "${fb.message.substring(0, 80)}..."`)
  .join("\n")}

Engineering Department Score: ${departmentHealth.find((d) => d.name === "Engineering")?.score}/100
`
  }

  // Risk queries
  if (lowerQuery.includes("risk") || lowerQuery.includes("alert")) {
    return `
**Active Risks Right Now:**
${riskAlerts.map((risk) => `- ${risk.title}: ${risk.severity} (${risk.affectedCount} affected)`).join("\n")}
`
  }

  // Team/department queries
  if (lowerQuery.includes("team") || lowerQuery.includes("department")) {
    return `
**All Department Health Scores:**
${departmentHealth.map((dept) => `- ${dept.name}: ${dept.score}/100 (${dept.change > 0 ? "+" : ""}${dept.change})`).join("\n")}
`
  }

  // Action queries
  if (lowerQuery.includes("action") || lowerQuery.includes("task")) {
    return `
**Current Action Items:**
${actionItems
  .map(
    (action) =>
      `- [${action.status.toUpperCase()}] ${action.title} (Owner: ${action.owner}, Due: ${action.dueDate.toLocaleDateString()})`
  )
  .join("\n")}
`
  }

  // Default: return full context
  return getDashboardContext()
}
