// RAG Knowledge Base for Coro AI
// Company docs, best practices, and searchable knowledge

export interface KnowledgeDoc {
  id: string
  title: string
  content: string
  category: "policy" | "best-practice" | "faq" | "guide"
  tags: string[]
  lastUpdated: Date
}

// Company knowledge base - add your actual docs here
export const knowledgeBase: KnowledgeDoc[] = [
  {
    id: "bp-1",
    title: "Responding to Burnout Feedback",
    content: `When employees report burnout or stress:

1. **Immediate Response (Within 24 hours):**
   - Schedule a 1:1 with the affected employee
   - Thank them for sharing openly
   - Assess urgency and safety

2. **Investigation (Within 48 hours):**
   - Review workload distribution
   - Check recent project timelines
   - Identify systemic vs individual issues

3. **Action Plan (Within 1 week):**
   - Redistribute work if needed
   - Adjust deadlines where possible
   - Provide mental health resources
   - Follow up weekly for 4 weeks

4. **Prevention:**
   - Monitor team capacity metrics
   - Encourage PTO usage
   - Regular check-ins on wellbeing
   - Clear boundaries on after-hours work

**Red Flags:**
- Multiple team members reporting same issue
- Sentiment drop >15 points in 2 weeks
- Increased turnover in same department`,
    category: "best-practice",
    tags: ["burnout", "stress", "wellbeing", "retention"],
    lastUpdated: new Date("2024-12-01"),
  },
  {
    id: "bp-2",
    title: "Managing Retention Risks",
    content: `When Coro identifies retention risks:

**High-Risk Indicators:**
- Disengagement pattern (reduced feedback participation)
- Sentiment decline over 2+ weeks
- Mentions of compensation/growth concerns
- High performer showing signs

**Immediate Actions:**
1. Conduct stay interview (not exit interview)
2. Ask: "What would make you more excited to work here?"
3. Review compensation against market
4. Discuss growth opportunities
5. Address concerns within 2 weeks

**Stay Interview Template:**
- What do you look forward to at work?
- What frustrates you most?
- What would make you consider leaving?
- How can we better support your goals?

**Cost Context:**
- Replacing mid-level: $50-90K
- Replacing senior: $100-200K
- Institutional knowledge: Priceless

**Prevention:**
- Quarterly career conversations
- Transparent promotion paths
- Market-rate compensation reviews
- Meaningful recognition programs`,
    category: "best-practice",
    tags: ["retention", "attrition", "compensation", "career-growth"],
    lastUpdated: new Date("2024-12-01"),
  },
  {
    id: "bp-3",
    title: "Escalation Protocol for Harassment",
    content: `**CRITICAL: Harassment/Discrimination Reports**

When feedback mentions harassment, discrimination, or hostile environment:

**IMMEDIATE (Same Day):**
1. 🚨 Escalate to HR immediately
2. Document exact feedback verbatim
3. DO NOT investigate yourself
4. DO NOT contact accused party
5. Preserve all related communications

**HR Will Handle:**
- Formal investigation
- Protective measures if needed
- Legal compliance (EEOC, etc.)
- Confidentiality protocols

**Your Role:**
- Support the reporter
- Maintain confidentiality
- Follow HR guidance
- Track follow-up actions

**Legal Note:**
Failure to escalate can create company liability.
When in doubt, escalate.`,
    category: "policy",
    tags: ["harassment", "discrimination", "legal", "HR", "compliance"],
    lastUpdated: new Date("2024-12-01"),
  },
  {
    id: "faq-1",
    title: "How to Interpret Culture Pulse Scores",
    content: `**Culture Pulse Score Guide:**

**85-100: Excellent**
- High engagement and trust
- Maintain with recognition and communication
- Share successes broadly

**70-84: Healthy**
- Normal range for most organizations
- Monitor trends more than absolute scores
- Address isolated concerns proactively

**55-69: At Risk**
- Identify specific pain points
- Increase leadership visibility
- Quick wins to build momentum

**Below 55: Critical**
- Immediate leadership intervention
- All-hands meeting to address concerns
- External support may be needed

**Trend > Score:**
A team at 75 trending down needs more attention
than a team at 65 trending up.

**Department Comparison:**
Compare teams to themselves over time,
not to each other (different baselines).`,
    category: "faq",
    tags: ["culture-pulse", "metrics", "interpretation"],
    lastUpdated: new Date("2024-12-01"),
  },
  {
    id: "guide-1",
    title: "Creating Effective Action Items",
    content: `**SMART Action Items:**

**Specific:** "Schedule 1:1 with Sarah about workload concerns"
Not: "Improve team morale"

**Measurable:** "Reduce after-hours messages by 50%"
Not: "Better work-life balance"

**Assignable:** Clear owner, not "team"
"Owner: Mike R. (Engineering Manager)"

**Realistic:** Can be completed with available resources
Check bandwidth before assigning

**Time-bound:** "Complete by Dec 15"
Not: "Soon" or "When possible"

**Best Practices:**
- Link to specific feedback
- Set clear success criteria
- Follow up in 1 week
- Close loop with reporter

**Common Mistakes:**
- Too vague ("look into it")
- No owner
- No deadline
- Created but never tracked`,
    category: "guide",
    tags: ["actions", "accountability", "feedback-loop"],
    lastUpdated: new Date("2024-12-01"),
  },
]

/**
 * Simple text similarity search (cosine similarity)
 * In production, use a proper vector database (Pinecone, Weaviate, etc.)
 */
export function searchKnowledge(query: string, limit: number = 3): KnowledgeDoc[] {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/)

  // Score each doc by keyword overlap
  const scored = knowledgeBase.map((doc) => {
    const docText = `${doc.title} ${doc.content} ${doc.tags.join(" ")}`.toLowerCase()

    // Count matching words
    const matches = queryWords.filter((word) => docText.includes(word)).length

    // Boost for tag matches
    const tagBoost = doc.tags.filter((tag) => queryLower.includes(tag)).length * 2

    return {
      doc,
      score: matches + tagBoost,
    }
  })

  // Sort by score and return top results
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc)
}

/**
 * Get relevant knowledge for a query
 */
export function getRelevantKnowledge(query: string): string {
  const docs = searchKnowledge(query, 2)

  if (docs.length === 0) {
    return ""
  }

  return `
## RELEVANT KNOWLEDGE BASE ARTICLES:

${docs
  .map(
    (doc) => `
### ${doc.title} (${doc.category})
${doc.content}
---
`
  )
  .join("\n")}

Use this knowledge to inform your response.
`
}
