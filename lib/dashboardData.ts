// LoopSync Dashboard Demo Data
// Production-quality data for a fictional 850-employee SaaS company with 2,000 customers

export interface FeedbackMessage {
  id: string
  timestamp: Date
  source: "employee" | "customer"
  department?: string
  segment?: string
  anonymityLevel: "anonymous" | "group" | "department" | "identified"
  message: string
  sentiment: "positive" | "neutral" | "negative"
  priority: "general" | "concern" | "critical"
  tags: string[]
}

export interface ActionItem {
  id: string
  title: string
  description: string
  owner: string
  ownerRole: string
  status: "pending" | "in_progress" | "completed"
  progress: number
  createdDate: Date
  dueDate: Date
  completedDate?: Date
  relatedMessages: number
  department: string
  impact?: string
}

export interface RiskAlert {
  id: string
  type: "legal" | "retention" | "customer_churn" | "project" | "culture"
  severity: "critical" | "warning" | "info"
  title: string
  description: string
  affectedCount: number
  detectedDate: Date
  signals: string[]
}

export interface DepartmentHealth {
  name: string
  score: number
  trend: "up" | "down" | "stable"
  employeeCount: number
  messageCount: number
  topConcerns: string[]
  change: number
}

export interface CustomerSegmentHealth {
  name: string
  score: number
  trend: "up" | "down" | "stable"
  customerCount: number
  messageCount: number
  churnRisk: "low" | "medium" | "high"
}

export interface DigestItem {
  priority: "critical" | "trending_up" | "trending_down" | "insight" | "action_required"
  title: string
  description: string
  actionLink?: string
  messageCount?: number
  icon: string
}

export interface CampaignMessage {
  id: string
  question: string
  targetAudience: string
  responseCount: number
  totalSent: number
  responseRate: number
  sentDate: Date
  status: "draft" | "active" | "completed"
  topResponses: Array<{ text: string; count: number }>
}

// ===========================
// CULTURE PULSE DATA
// ===========================

export const culturePulse = {
  currentScore: 72,
  previousScore: 67,
  change: 5,
  trend: "up" as const,
  last7Days: [68, 69, 70, 68, 71, 72, 72],
  lastUpdated: new Date(),
}

// ===========================
// REAL-TIME FEED DATA
// ===========================

export const recentFeedback: FeedbackMessage[] = [
  {
    id: "msg-001",
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    source: "employee",
    department: "Engineering",
    anonymityLevel: "anonymous",
    message: "Project Alpha deadline feels unrealistic. Team is burning out.",
    sentiment: "negative",
    priority: "concern",
    tags: ["burnout", "deadlines", "project-alpha"],
  },
  {
    id: "msg-002",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    source: "customer",
    segment: "Enterprise",
    anonymityLevel: "anonymous",
    message: "Support team isn't escalating critical issues to leadership. We've reported the same bug 3 times.",
    sentiment: "negative",
    priority: "concern",
    tags: ["support", "escalation", "bugs"],
  },
  {
    id: "msg-003",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    source: "employee",
    department: "Sales",
    anonymityLevel: "group",
    message: "New quota changes weren't explained clearly. Feels unfair.",
    sentiment: "negative",
    priority: "concern",
    tags: ["quotas", "compensation", "communication"],
  },
  {
    id: "msg-004",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    source: "employee",
    department: "HR",
    anonymityLevel: "department",
    message: "The new onboarding process is SO much better. New hires are ramping faster.",
    sentiment: "positive",
    priority: "general",
    tags: ["onboarding", "hr", "wins"],
  },
  {
    id: "msg-005",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    source: "customer",
    segment: "Mid-Market",
    anonymityLevel: "anonymous",
    message: "Your competitor just released the feature we've been asking for. Considering switching.",
    sentiment: "negative",
    priority: "critical",
    tags: ["churn-risk", "feature-request", "competitor"],
  },
  {
    id: "msg-006",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    source: "employee",
    department: "Product",
    anonymityLevel: "identified",
    message: "Marketing never loops us into customer feedback sessions. We're building blind.",
    sentiment: "negative",
    priority: "concern",
    tags: ["cross-functional", "communication", "silos"],
  },
  {
    id: "msg-007",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    source: "employee",
    department: "Customer Success",
    anonymityLevel: "anonymous",
    message: "Manager takes credit for our wins but blames us for losses.",
    sentiment: "negative",
    priority: "critical",
    tags: ["management", "toxic-culture", "accountability"],
  },
  {
    id: "msg-008",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    source: "customer",
    segment: "SMB",
    anonymityLevel: "anonymous",
    message: "Pricing is great. Product works well. Support response time is excellent!",
    sentiment: "positive",
    priority: "general",
    tags: ["pricing", "support", "product"],
  },
]

// ===========================
// ACTION TRACKER DATA
// ===========================

export const actionItems: ActionItem[] = [
  {
    id: "action-001",
    title: "Improve daily standup meetings",
    description: "Engineering team reporting standups are too long and unproductive. Implement new format.",
    owner: "Sarah Chen",
    ownerRole: "Engineering Manager",
    status: "in_progress",
    progress: 40,
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // Dec 20
    relatedMessages: 12,
    department: "Engineering",
  },
  {
    id: "action-002",
    title: "Clarify promotion criteria",
    description: "Multiple employees confused about promotion timeline and requirements. Create transparent rubric.",
    owner: "Alex Kim",
    ownerRole: "HR Director",
    status: "in_progress",
    progress: 60,
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // Dec 31
    relatedMessages: 8,
    department: "HR",
  },
  {
    id: "action-003",
    title: "Review Project Alpha timeline",
    description: "Engineering reporting unrealistic deadlines. Assess scope and extend timeline if needed.",
    owner: "Marcus Johnson",
    ownerRole: "VP Engineering",
    status: "pending",
    progress: 0,
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    relatedMessages: 15,
    department: "Engineering",
  },
  {
    id: "action-004",
    title: "Fix office AC unit",
    description: "Multiple reports of AC not working in west wing. Facilities to repair.",
    owner: "Facilities Team",
    ownerRole: "Operations",
    status: "completed",
    progress: 100,
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Dec 8
    relatedMessages: 6,
    department: "Operations",
    impact: "15 employees affected → 0",
  },
  {
    id: "action-005",
    title: "Update remote work policy",
    description: "Clarify hybrid expectations after employee confusion about in-office requirements.",
    owner: "Jessica Torres",
    ownerRole: "Chief People Officer",
    status: "completed",
    progress: 100,
    createdDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // Dec 5
    relatedMessages: 22,
    department: "HR",
    impact: "Culture Pulse +12 points after rollout",
  },
]

// ===========================
// RISK RADAR DATA
// ===========================

export const riskAlerts: RiskAlert[] = [
  {
    id: "risk-001",
    type: "legal",
    severity: "critical",
    title: "Harassment Pattern Detected",
    description: "Customer Success manager receiving multiple anonymous reports about inappropriate behavior.",
    affectedCount: 4,
    detectedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    signals: [
      "4 messages mentioning same manager",
      "Keywords: 'uncomfortable', 'inappropriate comments'",
      "Pattern similar to previous HR escalation",
    ],
  },
  {
    id: "risk-002",
    type: "retention",
    severity: "warning",
    title: "High Performer Flight Risk",
    description: "3 senior engineers showing disengagement signals. Retention intervention recommended.",
    affectedCount: 3,
    detectedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    signals: [
      "Negative sentiment shift over 2 weeks",
      "Mentions of 'looking elsewhere'",
      "Project Alpha burnout correlation",
    ],
  },
  {
    id: "risk-003",
    type: "customer_churn",
    severity: "warning",
    title: "Enterprise Customer Churn Risk",
    description: "2 enterprise customers mentioned competitor features. High churn probability.",
    affectedCount: 2,
    detectedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    signals: [
      "$240K ARR at risk",
      "Both mentioned 'considering switching'",
      "Feature gap: advanced analytics",
    ],
  },
  {
    id: "risk-004",
    type: "project",
    severity: "info",
    title: "Project Health: All Green",
    description: "No critical project risks detected. All major initiatives on track.",
    affectedCount: 0,
    detectedDate: new Date(),
    signals: ["8 active projects monitored", "No burnout signals detected"],
  },
]

// ===========================
// DEPARTMENT HEALTH DATA
// ===========================

export const departmentHealth: DepartmentHealth[] = [
  {
    name: "Engineering",
    score: 70,
    trend: "down",
    employeeCount: 180,
    messageCount: 45,
    topConcerns: ["Project Alpha deadlines", "Standup meetings", "Work-life balance"],
    change: -5,
  },
  {
    name: "Sales",
    score: 85,
    trend: "up",
    employeeCount: 120,
    messageCount: 28,
    topConcerns: ["Quota transparency", "Lead quality", "Sales tools"],
    change: 8,
  },
  {
    name: "Marketing",
    score: 75,
    trend: "stable",
    employeeCount: 45,
    messageCount: 12,
    topConcerns: ["Cross-functional communication", "Campaign budgets", "Headcount"],
    change: 0,
  },
  {
    name: "Product",
    score: 90,
    trend: "up",
    employeeCount: 65,
    messageCount: 18,
    topConcerns: ["Customer feedback loop", "Roadmap clarity", "Engineering bandwidth"],
    change: 12,
  },
  {
    name: "Customer Success",
    score: 68,
    trend: "down",
    employeeCount: 95,
    messageCount: 32,
    topConcerns: ["Manager behavior", "Escalation process", "Customer churn"],
    change: -8,
  },
  {
    name: "HR",
    score: 88,
    trend: "up",
    employeeCount: 25,
    messageCount: 8,
    topConcerns: ["Promotion criteria", "Onboarding process", "DEI initiatives"],
    change: 6,
  },
]

// ===========================
// CUSTOMER SEGMENT HEALTH DATA
// ===========================

export const customerSegmentHealth: CustomerSegmentHealth[] = [
  {
    name: "Enterprise",
    score: 82,
    trend: "up",
    customerCount: 45,
    messageCount: 18,
    churnRisk: "medium",
  },
  {
    name: "Mid-Market",
    score: 68,
    trend: "down",
    customerCount: 320,
    messageCount: 52,
    churnRisk: "high",
  },
  {
    name: "SMB",
    score: 88,
    trend: "stable",
    customerCount: 1635,
    messageCount: 95,
    churnRisk: "low",
  },
]

// ===========================
// AI-CURATED DIGEST DATA
// ===========================

export const todaysDigest: DigestItem[] = [
  {
    priority: "critical",
    title: "Engineering Burnout on Project Alpha",
    description: "12 messages in last 48 hours reporting unrealistic deadlines. Team morale declining rapidly.",
    actionLink: "/dashboard/actions/create",
    messageCount: 12,
    icon: "AlertTriangle",
  },
  {
    priority: "critical",
    title: "Harassment Pattern Detected",
    description: "4 anonymous reports about Customer Success manager. Immediate HR escalation required.",
    actionLink: "/dashboard/risks/risk-001",
    messageCount: 4,
    icon: "ShieldAlert",
  },
  {
    priority: "trending_up",
    title: "New Onboarding Process Success",
    description: "8/10 new hires praised updated onboarding. HR initiative showing strong ROI.",
    messageCount: 8,
    icon: "TrendingUp",
  },
  {
    priority: "trending_down",
    title: "Mid-Market Customer Sentiment Declining",
    description: "52 messages from mid-market segment show frustration with feature gaps and support.",
    actionLink: "/dashboard/health?segment=mid-market",
    messageCount: 52,
    icon: "TrendingDown",
  },
  {
    priority: "insight",
    title: "Marketing-Product Collaboration Gap",
    description: "Pattern detected: Marketing and Product teams rarely communicate. Cross-functional friction likely.",
    messageCount: 6,
    icon: "Lightbulb",
  },
]

// ===========================
// CUSTOM CAMPAIGNS DATA
// ===========================

export const campaigns: CampaignMessage[] = [
  {
    id: "campaign-001",
    question: "How do you feel about the new remote work policy?",
    targetAudience: "All Employees",
    responseCount: 287,
    totalSent: 850,
    responseRate: 33.8,
    sentDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "completed",
    topResponses: [
      { text: "Love the flexibility!", count: 145 },
      { text: "Need more clarity on in-office days", count: 78 },
      { text: "Worried about career visibility if remote", count: 42 },
    ],
  },
  {
    id: "campaign-002",
    question: "What would make you more likely to recommend our product?",
    targetAudience: "Enterprise Customers",
    responseCount: 28,
    totalSent: 45,
    responseRate: 62.2,
    sentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: "completed",
    topResponses: [
      { text: "Advanced analytics dashboard", count: 18 },
      { text: "Better API documentation", count: 6 },
      { text: "Faster support response times", count: 4 },
    ],
  },
  {
    id: "campaign-003",
    question: "What's the #1 thing leadership should focus on right now?",
    targetAudience: "Engineering Department",
    responseCount: 52,
    totalSent: 180,
    responseRate: 28.9,
    sentDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "active",
    topResponses: [
      { text: "Reduce meeting overhead", count: 22 },
      { text: "Hire more engineers", count: 18 },
      { text: "Fix project planning process", count: 12 },
    ],
  },
]

// ===========================
// HELPER FUNCTIONS
// ===========================

export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case "positive":
      return "text-green-600"
    case "negative":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export function getSentimentEmoji(sentiment: string): string {
  switch (sentiment) {
    case "positive":
      return "😊"
    case "negative":
      return "😞"
    default:
      return "😐"
  }
}

export function getSeverityStyles(severity: string) {
  switch (severity) {
    case "critical":
      return {
        bg: "bg-red-500/10",
        text: "text-red-600",
        border: "border-red-500/20",
        icon: "🔴",
      }
    case "warning":
      return {
        bg: "bg-yellow-500/10",
        text: "text-yellow-600",
        border: "border-yellow-500/20",
        icon: "🟡",
      }
    default:
      return {
        bg: "bg-green-500/10",
        text: "text-green-600",
        border: "border-green-500/20",
        icon: "🟢",
      }
  }
}
