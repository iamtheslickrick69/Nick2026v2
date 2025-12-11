import { NextRequest, NextResponse } from "next/server"
import { checkGuardrails } from "@/lib/guardrails"
import { getDashboardContext, getContextForQuery } from "@/lib/dashboardContext"
import { getRelevantKnowledge } from "@/lib/rag/knowledgeBase"
import { saveMessage, getUserHistory } from "@/lib/rag/conversationStore"

// Enhanced system prompt with few-shot examples
const SYSTEM_PROMPT = `You are Coro, the AI assistant for LoopSync - an employee feedback platform. You help users understand feedback patterns, manage actions, assess risks, and improve team culture.

## Core Capabilities:
- Analyze employee feedback and sentiment trends
- Identify burnout signals and retention risks
- Suggest specific, actionable responses to feedback
- Provide team health summaries with real metrics
- Navigate dashboard features
- Explain insights and recommend next steps

## Response Guidelines:
1. **Be Specific:** Reference actual data, numbers, and names when available
2. **Be Actionable:** Always suggest concrete next steps
3. **Be Concise:** Keep responses under 200 words when possible
4. **Use Formatting:** Use markdown for clarity (bullets, bold, emojis)
5. **Show Confidence:** Rate your confidence when making predictions (e.g., "85% confident...")

## Example Interactions:

User: "What's going on with the Engineering team?"
Assistant: "📊 **Engineering Health: 72/100** (Down 3 points)

**Key Issues:**
• Workload concerns from 3 team members (last 48hrs)
• Sentiment dropped 12% this week
• Below-average PTO usage

**Immediate Actions:**
1. Schedule 1:1s with Sarah K., Mike R., and Alex T.
2. Review Q4 sprint deadlines
3. Consider resource reallocation

Confidence: 87% - based on recent feedback patterns and sentiment analysis."

User: "Should I be worried about retention?"
Assistant: "⚠️ **Retention Risk: MODERATE (72% severity)**

**At Risk:**
• 3 high-performers showing disengagement
• Estimated replacement cost: $90K

**Warning Signs:**
• Reduced participation in feedback
• Sentiment decline over 2 weeks
• Below-average engagement scores

**Recommended Actions:**
1. Conduct stay interviews this week
2. Review compensation vs. market rates
3. Assess workload distribution

I'd prioritize this within 7 days."

Tone: Professional, empathetic, direct, and solution-oriented.`

export async function POST(req: NextRequest) {
  try {
    const { messages, userId = "anonymous" } = await req.json()

    // Validate API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key not configured" },
        { status: 500 }
      )
    }

    // Extract user message (last message in array)
    const userMessage = messages[messages.length - 1]?.content || ""

    // 🛡️ GUARDRAILS CHECK
    const guardrailResult = checkGuardrails(userId, userMessage, messages.length)

    if (!guardrailResult.allowed) {
      return NextResponse.json({
        role: "assistant",
        content: `⚠️ ${guardrailResult.reason}`,
        blocked: true,
      })
    }

    // Use sanitized input
    const sanitizedMessage = guardrailResult.sanitizedInput || userMessage

    // 📊 INJECT REAL DASHBOARD DATA
    const dashboardContext = getContextForQuery(sanitizedMessage)

    // 📚 RAG: Get relevant knowledge base articles
    const knowledgeContext = getRelevantKnowledge(sanitizedMessage)

    // 🕐 Get conversation history for context
    const conversationHistory = getUserHistory(userId, 5)
    const historyContext =
      conversationHistory.length > 0
        ? `\n## RECENT CONVERSATION HISTORY:\n${conversationHistory
            .map((msg) => `${msg.role}: ${msg.content.substring(0, 150)}${msg.content.length > 150 ? "..." : ""}`)
            .join("\n")}`
        : ""

    // Save user message to analytics
    const startTime = Date.now()
    saveMessage(userId, "user", sanitizedMessage)

    // Call Anthropic Claude API with enhanced context
    const enhancedSystemPrompt = `${SYSTEM_PROMPT}

${dashboardContext}${knowledgeContext}${historyContext}`

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1024,
        system: enhancedSystemPrompt,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Anthropic API error:", error)

      // Return fallback response on error
      return NextResponse.json({
        role: "assistant",
        content: getFallbackResponse(userMessage),
      })
    }

    const data = await response.json()
    const assistantMessage = data.content[0].text

    // Add warning if sensitive topic detected
    const finalMessage = guardrailResult.warning
      ? `⚠️ ${guardrailResult.warning}\n\n${assistantMessage}`
      : assistantMessage

    // Save assistant response to analytics
    const responseTime = Date.now() - startTime
    saveMessage(userId, "assistant", finalMessage, {
      responseTime,
      warning: guardrailResult.warning,
    })

    return NextResponse.json({
      role: "assistant",
      content: finalMessage,
      warning: guardrailResult.warning,
      responseTime,
    })
  } catch (error) {
    console.error("Chat API error:", error)

    // Return fallback response on error
    const { messages } = await req.json()
    const userMessage = messages[messages.length - 1]?.content || ""

    return NextResponse.json({
      role: "assistant",
      content: getFallbackResponse(userMessage),
    })
  }
}

// Fallback responses when API fails
function getFallbackResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes("burnout") || lowerInput.includes("stress")) {
    return "I've detected elevated stress signals in the Engineering team. Based on recent feedback:\n\n📊 **Key Insights:**\n• 3 team members mentioned workload concerns in the past 48 hours\n• Sentiment dropped 12 points this week\n• After-hours messaging sentiment is negative\n\n💡 **Suggested Actions:**\n1. Schedule 1:1s with affected team members\n2. Review Q4 deadline feasibility\n3. Assess resource allocation\n\nWould you like me to create action items for these?"
  }

  if (lowerInput.includes("risk") || lowerInput.includes("alert")) {
    return "🚨 **Active Risks:**\n\n1. **Retention Risk (72% severity)**\n   • 3 high-performers showing disengagement\n   • Predicted impact: $90K replacement cost\n\n2. **Burnout Risk (68% severity)**\n   • Engineering team elevated stress\n   • Productivity decline risk\n\nClick any risk card on the dashboard for detailed analysis."
  }

  if (lowerInput.includes("culture") || lowerInput.includes("pulse")) {
    return "📈 **Culture Pulse: 68/100**\n\n**Trend:** Down 2 points from last week\n\n**Key Factors:**\n• Employee engagement: Stable\n• Trust in leadership: Slight decline\n• Work-life balance: Concerning drop\n\n**Bright Spots:**\n✨ Marketing team trust score up 23%\n✨ Loop closure rate: 94%"
  }

  return "I can help you with:\n\n🔍 **Analysis**\n• Identify feedback patterns\n• Predict retention risks\n• Analyze sentiment trends\n\n⚡ **Actions**\n• Suggest responses to critical feedback\n• Create action items\n• Escalate urgent issues\n\n📊 **Insights**\n• Department health summaries\n• Risk assessments\n• Team sentiment analysis\n\nTry asking: 'What risks are active?' or 'Show me burnout signals'"
}
