/**
 * Coro AI Guardrails System
 *
 * This module implements safety and quality controls for Coro's AI responses:
 * - Content filtering and moderation
 * - Rate limiting
 * - Context management
 * - Response validation
 */

import { CoroMessage } from '@/contexts/CoroContext'

// Banned patterns (basic content filtering)
const BANNED_PATTERNS = [
  /\b(hack|exploit|bypass|circumvent)\s+(system|security|auth)/gi,
  /\b(steal|theft|rob)\s+(data|credentials|password)/gi,
  /\b(illegal|unlawful)\s+(activity|action)/gi,
  /\b(harm|hurt|attack)\s+(person|people|user)/gi,
]

// Sensitive topics that require careful handling
const SENSITIVE_TOPICS = [
  /\b(fire|terminate|layoff|dismissal)\s+(employee|staff|worker)/gi,
  /\b(discrimination|harassment|abuse)/gi,
  /\b(legal|lawsuit|litigation)/gi,
  /\bconfidential\s+(information|data)/gi,
]

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export interface GuardrailsConfig {
  maxMessagesPerMinute?: number
  maxMessagesPerHour?: number
  maxContextLength?: number
  enableContentFiltering?: boolean
  enableRateLimiting?: boolean
}

export interface GuardrailsResult {
  allowed: boolean
  reason?: string
  suggestion?: string
  severity?: 'low' | 'medium' | 'high'
}

/**
 * Check if content contains banned patterns
 */
export function checkBannedContent(content: string): GuardrailsResult {
  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(content)) {
      return {
        allowed: false,
        reason: 'Content contains prohibited keywords or patterns',
        suggestion: 'Please rephrase your question in a constructive manner.',
        severity: 'high'
      }
    }
  }

  return { allowed: true }
}

/**
 * Check if content contains sensitive topics
 */
export function checkSensitiveContent(content: string): GuardrailsResult {
  for (const pattern of SENSITIVE_TOPICS) {
    if (pattern.test(content)) {
      return {
        allowed: true, // Allow but flag for careful handling
        reason: 'Content contains sensitive topic',
        suggestion: 'I\'ll handle this carefully. For sensitive HR matters, please also consult with your HR department.',
        severity: 'medium'
      }
    }
  }

  return { allowed: true }
}

/**
 * Rate limiting check
 */
export function checkRateLimit(
  userId: string,
  config: GuardrailsConfig = {}
): GuardrailsResult {
  const {
    maxMessagesPerMinute = 10,
    maxMessagesPerHour = 100
  } = config

  const now = Date.now()
  const minuteKey = `${userId}-minute`
  const hourKey = `${userId}-hour`

  // Check minute limit
  const minuteData = rateLimitStore.get(minuteKey)
  if (minuteData) {
    if (now < minuteData.resetAt) {
      if (minuteData.count >= maxMessagesPerMinute) {
        return {
          allowed: false,
          reason: 'Rate limit exceeded',
          suggestion: 'You\'re sending messages too quickly. Please wait a moment.',
          severity: 'low'
        }
      }
      minuteData.count++
    } else {
      rateLimitStore.set(minuteKey, { count: 1, resetAt: now + 60000 })
    }
  } else {
    rateLimitStore.set(minuteKey, { count: 1, resetAt: now + 60000 })
  }

  // Check hour limit
  const hourData = rateLimitStore.get(hourKey)
  if (hourData) {
    if (now < hourData.resetAt) {
      if (hourData.count >= maxMessagesPerHour) {
        return {
          allowed: false,
          reason: 'Hourly limit exceeded',
          suggestion: 'You\'ve reached your hourly message limit. Please try again later.',
          severity: 'medium'
        }
      }
      hourData.count++
    } else {
      rateLimitStore.set(hourKey, { count: 1, resetAt: now + 3600000 })
    }
  } else {
    rateLimitStore.set(hourKey, { count: 1, resetAt: now + 3600000 })
  }

  return { allowed: true }
}

/**
 * Manage conversation context length
 */
export function manageContext(
  messages: Array<{ role: string; content: string }>,
  maxContextLength: number = 10
): Array<{ role: string; content: string }> {
  // Always keep system message if present
  const systemMessages = messages.filter(m => m.role === 'system')
  const conversationMessages = messages.filter(m => m.role !== 'system')

  // Keep only the most recent messages
  const trimmedConversation = conversationMessages.slice(-maxContextLength)

  return [...systemMessages, ...trimmedConversation]
}

/**
 * Validate AI response before sending to user
 */
export function validateResponse(response: string): GuardrailsResult {
  // Check for empty or too short responses
  if (!response || response.trim().length < 10) {
    return {
      allowed: false,
      reason: 'Response too short or empty',
      severity: 'low'
    }
  }

  // Check for response length (too long might be hallucination)
  if (response.length > 5000) {
    return {
      allowed: true,
      reason: 'Response is very long',
      suggestion: 'This is a detailed response. Consider breaking it down.',
      severity: 'low'
    }
  }

  // Check for common AI failure patterns
  const failurePatterns = [
    /as an ai (language model|assistant)/gi,
    /i (don't|do not|cannot) have access to/gi,
    /i (can't|cannot) (browse|access) the (internet|web)/gi,
  ]

  for (const pattern of failurePatterns) {
    if (pattern.test(response)) {
      return {
        allowed: true,
        reason: 'Response contains AI limitation language',
        suggestion: 'Consider rephrasing to be more helpful.',
        severity: 'low'
      }
    }
  }

  return { allowed: true }
}

/**
 * Main guardrails check - runs all validations
 */
export function runGuardrails(
  content: string,
  userId: string,
  config: GuardrailsConfig = {}
): GuardrailsResult {
  const {
    enableContentFiltering = true,
    enableRateLimiting = true
  } = config

  // Check banned content
  if (enableContentFiltering) {
    const bannedCheck = checkBannedContent(content)
    if (!bannedCheck.allowed) {
      return bannedCheck
    }
  }

  // Check rate limiting
  if (enableRateLimiting) {
    const rateLimitCheck = checkRateLimit(userId, config)
    if (!rateLimitCheck.allowed) {
      return rateLimitCheck
    }
  }

  // Check sensitive content (informational only)
  const sensitiveCheck = checkSensitiveContent(content)

  return sensitiveCheck
}

/**
 * Get system prompt for Coro
 */
export function getCoroSystemPrompt(): string {
  return `You are Coro, an AI assistant for LoopSync - an employee feedback and culture management platform.

Your role is to help users:
- Understand employee feedback and sentiment
- Track and manage action items
- Analyze culture health metrics
- Provide insights on manager performance
- Identify risks and trends
- Suggest actionable improvements

Key guidelines:
1. Be professional, empathetic, and constructive
2. Focus on data-driven insights when discussing the platform
3. For sensitive HR topics (terminations, discrimination, legal issues), acknowledge the sensitivity and suggest consulting with HR professionals
4. Provide specific, actionable recommendations when possible
5. If you don't have access to specific data, be clear about that and suggest what the user can check in their dashboard
6. Always prioritize employee wellbeing and positive workplace culture
7. Be concise but thorough - aim for clarity
8. Use a friendly, approachable tone while maintaining professionalism

Remember: You're here to support better workplace culture and employee engagement through the LoopSync platform.`
}

/**
 * Clean up old rate limit entries (call periodically)
 */
export function cleanupRateLimits(): void {
  const now = Date.now()
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetAt) {
      rateLimitStore.delete(key)
    }
  }
}

// Cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000)
}
