// Enterprise-grade guardrails for Coro AI
// Protects against abuse, limits costs, and ensures safety

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory rate limiting (replace with Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Banned patterns for content filtering
const BANNED_PATTERNS = [
  /\b(fuck|shit|damn|bitch|asshole|cunt|bastard)\b/gi,
  /\b(password|api[_-]?key|secret|token)\b/gi, // Prevent sharing credentials
  /\b(ssn|social security|credit card)\b/gi, // PII protection
  /\b(hack|exploit|vulnerability|inject)\b/gi, // Security concerns
]

// Sensitive topics that require careful handling
const SENSITIVE_TOPICS = [
  /\b(suicide|self[_-]?harm|kill myself)\b/gi,
  /\b(harassment|discrimination|abuse)\b/gi,
  /\b(illegal|crime|fraud)\b/gi,
]

// Maximum message lengths
const MAX_MESSAGE_LENGTH = 500
const MAX_CONVERSATION_LENGTH = 20 // messages
const MAX_TOKENS_PER_REQUEST = 1024

// Rate limits
const RATE_LIMITS = {
  perMinute: 10,
  perHour: 100,
  perDay: 500,
}

export interface GuardrailResult {
  allowed: boolean
  reason?: string
  sanitizedInput?: string
  warning?: string
}

/**
 * Check rate limits for a user/session
 */
export function checkRateLimit(userId: string): GuardrailResult {
  const now = Date.now()
  const entry = rateLimitStore.get(userId)

  if (!entry) {
    // First request
    rateLimitStore.set(userId, {
      count: 1,
      resetTime: now + 60 * 1000, // 1 minute
    })
    return { allowed: true }
  }

  // Reset if time window passed
  if (now > entry.resetTime) {
    rateLimitStore.set(userId, {
      count: 1,
      resetTime: now + 60 * 1000,
    })
    return { allowed: true }
  }

  // Check limit
  if (entry.count >= RATE_LIMITS.perMinute) {
    return {
      allowed: false,
      reason: "Rate limit exceeded. Please wait a moment before sending another message.",
    }
  }

  // Increment count
  entry.count++
  return { allowed: true }
}

/**
 * Filter inappropriate content
 */
export function filterContent(input: string): GuardrailResult {
  // Check message length
  if (input.length > MAX_MESSAGE_LENGTH) {
    return {
      allowed: false,
      reason: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
    }
  }

  // Check for banned patterns
  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(input)) {
      return {
        allowed: false,
        reason: "Your message contains inappropriate content. Please rephrase.",
      }
    }
  }

  // Check for sensitive topics
  let hasSensitiveTopic = false
  for (const pattern of SENSITIVE_TOPICS) {
    if (pattern.test(input)) {
      hasSensitiveTopic = true
      break
    }
  }

  if (hasSensitiveTopic) {
    return {
      allowed: true,
      warning:
        "This appears to be a sensitive topic. If you're experiencing a crisis, please reach out to your HR department or local support resources.",
      sanitizedInput: input,
    }
  }

  return {
    allowed: true,
    sanitizedInput: input,
  }
}

/**
 * Validate conversation length
 */
export function validateConversationLength(messageCount: number): GuardrailResult {
  if (messageCount > MAX_CONVERSATION_LENGTH) {
    return {
      allowed: false,
      reason: "Conversation too long. Please start a new chat for better performance.",
    }
  }
  return { allowed: true }
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  // Remove potential script tags
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, "")

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, " ").trim()

  return sanitized
}

/**
 * Master guardrail check - runs all validations
 */
export function checkGuardrails(
  userId: string,
  input: string,
  conversationLength: number
): GuardrailResult {
  // 1. Rate limit check
  const rateLimitResult = checkRateLimit(userId)
  if (!rateLimitResult.allowed) {
    return rateLimitResult
  }

  // 2. Sanitize input
  const sanitized = sanitizeInput(input)

  // 3. Content filter
  const contentResult = filterContent(sanitized)
  if (!contentResult.allowed) {
    return contentResult
  }

  // 4. Conversation length
  const lengthResult = validateConversationLength(conversationLength)
  if (!lengthResult.allowed) {
    return lengthResult
  }

  // All checks passed
  return {
    allowed: true,
    sanitizedInput: contentResult.sanitizedInput || sanitized,
    warning: contentResult.warning,
  }
}

/**
 * Get cost estimate for a request
 */
export function estimateCost(inputTokens: number, outputTokens: number): number {
  // Claude 3.5 Haiku pricing (as of Dec 2024)
  // Input: $0.25 per million tokens
  // Output: $1.25 per million tokens
  const inputCost = (inputTokens / 1_000_000) * 0.25
  const outputCost = (outputTokens / 1_000_000) * 1.25
  return inputCost + outputCost
}

/**
 * Clean up old rate limit entries (run periodically)
 */
export function cleanupRateLimits(): void {
  const now = Date.now()
  for (const [userId, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime + 60 * 60 * 1000) {
      // Remove entries older than 1 hour
      rateLimitStore.delete(userId)
    }
  }
}

// Run cleanup every 10 minutes
if (typeof window === "undefined") {
  // Server-side only
  setInterval(cleanupRateLimits, 10 * 60 * 1000)
}
