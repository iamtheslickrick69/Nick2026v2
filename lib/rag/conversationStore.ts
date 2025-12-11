// Conversation history and analytics tracking
// In production, replace with proper database (PostgreSQL, MongoDB, etc.)

export interface ConversationMessage {
  id: string
  userId: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  metadata?: {
    blocked?: boolean
    warning?: string
    responseTime?: number
    tokenCount?: number
  }
}

export interface ConversationSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  messages: ConversationMessage[]
  totalMessages: number
  avgResponseTime?: number
  topics: string[]
}

export interface AnalyticsMetrics {
  totalConversations: number
  totalMessages: number
  avgMessagesPerConversation: number
  avgResponseTime: number
  topTopics: { topic: string; count: number }[]
  blockedMessages: number
  warningMessages: number
  userSatisfaction?: number
  peakUsageHours: number[]
}

// In-memory store (replace with database in production)
const conversationStore: Map<string, ConversationSession> = new Map()
const messageStore: ConversationMessage[] = []

/**
 * Save a conversation message
 */
export function saveMessage(
  userId: string,
  role: "user" | "assistant",
  content: string,
  metadata?: ConversationMessage["metadata"]
): ConversationMessage {
  const message: ConversationMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    role,
    content,
    timestamp: new Date(),
    metadata,
  }

  messageStore.push(message)

  // Update or create conversation session
  const activeSession = getActiveSession(userId)
  if (activeSession) {
    activeSession.messages.push(message)
    activeSession.totalMessages++
  } else {
    createSession(userId, [message])
  }

  return message
}

/**
 * Create a new conversation session
 */
function createSession(userId: string, messages: ConversationMessage[]): ConversationSession {
  const session: ConversationSession = {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    startTime: new Date(),
    messages,
    totalMessages: messages.length,
    topics: extractTopics(messages),
  }

  conversationStore.set(session.id, session)
  return session
}

/**
 * Get active session for a user (last session within 1 hour)
 */
function getActiveSession(userId: string): ConversationSession | null {
  const sessions = Array.from(conversationStore.values()).filter((s) => s.userId === userId)

  if (sessions.length === 0) return null

  const latest = sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0]

  // Session is active if within 1 hour
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  if (latest.startTime.getTime() > oneHourAgo) {
    return latest
  }

  return null
}

/**
 * Extract topics from messages (simple keyword extraction)
 */
function extractTopics(messages: ConversationMessage[]): string[] {
  const content = messages.map((m) => m.content.toLowerCase()).join(" ")

  const topicKeywords = [
    "burnout",
    "stress",
    "retention",
    "compensation",
    "culture",
    "feedback",
    "action",
    "risk",
    "team",
    "manager",
    "harassment",
    "workload",
  ]

  return topicKeywords.filter((keyword) => content.includes(keyword))
}

/**
 * Get conversation history for a user
 */
export function getUserHistory(userId: string, limit: number = 10): ConversationMessage[] {
  return messageStore.filter((m) => m.userId === userId).slice(-limit)
}

/**
 * Search conversations by content
 */
export function searchConversations(query: string, limit: number = 20): ConversationMessage[] {
  const queryLower = query.toLowerCase()

  return messageStore
    .filter((m) => m.content.toLowerCase().includes(queryLower))
    .slice(0, limit)
    .reverse() // Most recent first
}

/**
 * Get analytics metrics
 */
export function getAnalytics(timeRange?: { start: Date; end: Date }): AnalyticsMetrics {
  let messages = messageStore

  // Filter by time range if provided
  if (timeRange) {
    messages = messages.filter(
      (m) => m.timestamp >= timeRange.start && m.timestamp <= timeRange.end
    )
  }

  const conversations = Array.from(conversationStore.values())

  // Calculate metrics
  const totalMessages = messages.length
  const totalConversations = conversations.length

  const blockedMessages = messages.filter((m) => m.metadata?.blocked).length
  const warningMessages = messages.filter((m) => m.metadata?.warning).length

  const responseTimes = messages
    .filter((m) => m.metadata?.responseTime)
    .map((m) => m.metadata!.responseTime!)

  const avgResponseTime =
    responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : 0

  // Top topics
  const topicCounts = new Map<string, number>()
  conversations.forEach((conv) => {
    conv.topics.forEach((topic) => {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
    })
  })

  const topTopics = Array.from(topicCounts.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Peak usage hours
  const hourCounts = new Map<number, number>()
  messages.forEach((m) => {
    const hour = m.timestamp.getHours()
    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1)
  })

  const peakUsageHours = Array.from(hourCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([hour]) => hour)

  return {
    totalConversations,
    totalMessages,
    avgMessagesPerConversation: totalConversations > 0 ? totalMessages / totalConversations : 0,
    avgResponseTime,
    topTopics,
    blockedMessages,
    warningMessages,
    peakUsageHours,
  }
}

/**
 * Get recent conversations for dashboard
 */
export function getRecentConversations(limit: number = 20): ConversationSession[] {
  return Array.from(conversationStore.values())
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
    .slice(0, limit)
}

/**
 * Clear old data (run periodically to prevent memory bloat)
 */
export function cleanupOldData(daysToKeep: number = 30): void {
  const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)

  // Remove old sessions
  for (const [id, session] of conversationStore.entries()) {
    if (session.startTime < cutoffDate) {
      conversationStore.delete(id)
    }
  }

  // Remove old messages
  const validMessages = messageStore.filter((m) => m.timestamp >= cutoffDate)
  messageStore.length = 0
  messageStore.push(...validMessages)
}

// Auto-cleanup every 24 hours (server-side only)
if (typeof window === "undefined") {
  setInterval(() => cleanupOldData(30), 24 * 60 * 60 * 1000)
}
