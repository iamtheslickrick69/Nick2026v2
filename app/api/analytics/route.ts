import { NextResponse } from "next/server"
import { getAnalytics } from "@/lib/rag/conversationStore"

export async function GET() {
  try {
    const analytics = getAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Analytics API error:", error)

    // Return empty analytics on error
    return NextResponse.json({
      totalConversations: 0,
      totalMessages: 0,
      avgMessagesPerConversation: 0,
      avgResponseTime: 0,
      topTopics: [],
      blockedMessages: 0,
      warningMessages: 0,
      peakUsageHours: [],
    })
  }
}
