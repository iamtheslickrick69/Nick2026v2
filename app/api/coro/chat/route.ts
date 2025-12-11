import { NextRequest, NextResponse } from 'next/server'
import {
  runGuardrails,
  validateResponse,
  manageContext,
  getCoroSystemPrompt,
  GuardrailsConfig
} from '@/lib/coro/guardrails'

// Configuration
const GUARDRAILS_CONFIG: GuardrailsConfig = {
  maxMessagesPerMinute: 10,
  maxMessagesPerHour: 100,
  maxContextLength: 15,
  enableContentFiltering: true,
  enableRateLimiting: true
}

/**
 * POST /api/coro/chat
 * Main chat endpoint for Coro AI assistant
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      )
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Invalid request: last message must be from user' },
        { status: 400 }
      )
    }

    // Get user ID (in production, this would come from authentication)
    // For now, using IP address or session ID
    const userId = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'

    // Run guardrails on user input
    const guardrailResult = runGuardrails(
      lastMessage.content,
      userId,
      GUARDRAILS_CONFIG
    )

    if (!guardrailResult.allowed) {
      return NextResponse.json(
        {
          message: guardrailResult.suggestion || 'Your message could not be processed.',
          metadata: {
            confidence: 0,
            blocked: true,
            reason: guardrailResult.reason
          }
        },
        { status: 200 }
      )
    }

    // Manage context length
    const managedMessages = manageContext(messages, GUARDRAILS_CONFIG.maxContextLength)

    // Add system prompt
    const messagesWithSystem = [
      { role: 'system', content: getCoroSystemPrompt() },
      ...managedMessages
    ]

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!openaiApiKey) {
      // Fallback to mock response if no API key
      console.warn('OPENAI_API_KEY not configured, using mock response')
      return getMockResponse(lastMessage.content, guardrailResult)
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using GPT-4o-mini for cost efficiency
        messages: messagesWithSystem,
        temperature: 0.7,
        max_tokens: 1000,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)

      // Fallback to mock response on API error
      return getMockResponse(lastMessage.content, guardrailResult)
    }

    const openaiData = await openaiResponse.json()
    const aiMessage = openaiData.choices[0]?.message?.content

    if (!aiMessage) {
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      )
    }

    // Validate AI response
    const validationResult = validateResponse(aiMessage)
    if (!validationResult.allowed) {
      console.warn('AI response failed validation:', validationResult.reason)
      return getMockResponse(lastMessage.content, guardrailResult)
    }

    // Build response metadata
    const metadata: any = {
      confidence: 0.85,
      model: 'gpt-4o-mini'
    }

    // Add warning if sensitive content was detected
    if (guardrailResult.reason === 'Content contains sensitive topic') {
      metadata.sensitiveWarning = guardrailResult.suggestion
    }

    // Detect if response is actionable
    if (
      aiMessage.toLowerCase().includes('should') ||
      aiMessage.toLowerCase().includes('recommend') ||
      aiMessage.toLowerCase().includes('suggest') ||
      aiMessage.toLowerCase().includes('action')
    ) {
      metadata.actionable = true
    }

    return NextResponse.json({
      message: aiMessage,
      metadata
    })

  } catch (error) {
    console.error('Error in Coro chat endpoint:', error)
    return NextResponse.json(
      {
        message: "I'm having trouble processing your request right now. Please try again in a moment.",
        metadata: {
          confidence: 0,
          error: true
        }
      },
      { status: 200 } // Return 200 to show error message to user
    )
  }
}

/**
 * Mock response fallback (used when OpenAI is not configured or fails)
 */
function getMockResponse(userMessage: string, guardrailResult: any) {
  const lowerMessage = userMessage.toLowerCase()

  let response = ''
  let confidence = 0.7
  let actionable = false

  // Pattern matching for common queries
  if (lowerMessage.includes('feedback') || lowerMessage.includes('employee')) {
    response = "I can help you analyze employee feedback! In your LoopSync dashboard, you can view recent feedback in the Feedback Feed, track sentiment trends over time, and identify common themes. Would you like me to guide you to a specific section?"
    actionable = true
  } else if (lowerMessage.includes('action') || lowerMessage.includes('task')) {
    response = "The Action Tracker helps you monitor follow-ups on employee feedback. You can filter actions by status (open, in progress, completed), priority level, and department. I recommend reviewing open high-priority actions first. Would you like tips on prioritizing actions?"
    actionable = true
  } else if (lowerMessage.includes('culture') || lowerMessage.includes('health')) {
    response = "Your Culture Health Score combines multiple metrics including employee sentiment, engagement levels, and feedback response rates. A healthy score is typically above 75. You can drill down into specific dimensions on the Culture Health page to identify areas for improvement."
    actionable = true
  } else if (lowerMessage.includes('manager') || lowerMessage.includes('scorecard')) {
    response = "The Manager Scorecard tracks how well managers are responding to and acting on employee feedback. Key metrics include response time, action completion rate, and sentiment trends in their teams. Managers with declining scores may need additional support or coaching."
    actionable = true
  } else if (lowerMessage.includes('risk') || lowerMessage.includes('issue')) {
    response = "The Risk Radar identifies potential issues before they escalate. It analyzes feedback patterns, sentiment shifts, and unresolved concerns. I recommend addressing high-severity risks within 48 hours. Check the Risk Radar page for current alerts."
    actionable = true
  } else if (lowerMessage.includes('insight') || lowerMessage.includes('ai')) {
    response = "I analyze your feedback data to surface insights automatically. You can find AI-generated insights on the main dashboard and the dedicated Insights page. These include sentiment analysis, trend detection, and actionable recommendations based on employee feedback patterns."
  } else if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
    response = "I'm here to help you get the most out of LoopSync! I can help you understand your dashboard metrics, track action items, analyze feedback trends, and provide insights on your workplace culture. What specific area would you like to explore?"
    actionable = true
  } else {
    response = "I'm Coro, your LoopSync AI assistant! I can help you with feedback analysis, action tracking, culture health monitoring, and manager performance insights. What would you like to know more about?"
  }

  // Add sensitive content warning if needed
  if (guardrailResult.reason === 'Content contains sensitive topic') {
    response = guardrailResult.suggestion + '\n\n' + response
    confidence = 0.6
  }

  return NextResponse.json({
    message: response,
    metadata: {
      confidence,
      actionable,
      mock: true,
      note: 'Configure OPENAI_API_KEY environment variable for full AI capabilities'
    }
  })
}
