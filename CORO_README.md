# Coro AI Agent - Complete System Documentation

## Overview

Coro is an intelligent AI assistant built into the LoopSync Employee Feedback Platform. It lives in the bottom right corner of the screen as an animated orb and provides users with real-time assistance for understanding employee feedback, tracking actions, analyzing culture health, and more.

## Architecture

### 1. **Frontend Components**

#### **CoroOrb** (`components/coro/CoroOrb.tsx`)
- Beautiful animated orb that floats in the bottom-right corner
- Features:
  - Gradient animated border with rotating effect
  - Pulsing notification indicator for new messages
  - Floating particle effects
  - Smooth hover animations and tooltip
  - Auto-shows notification badge when new AI message arrives while chat is closed

#### **CoroChat** (`components/coro/CoroChat.tsx`)
- Professional 4k messaging interface
- Features:
  - Smooth slide-up animation on open
  - Minimizable header
  - Auto-scrolling message history
  - Real-time typing indicator
  - Message input with keyboard shortcuts (Enter to send, Shift+Enter for new line)
  - Clear history option
  - Responsive 420px wide panel

#### **CoroMessage** (`components/coro/CoroMessage.tsx`)
- Individual message bubbles with different styles for user/AI
- Features:
  - Animated entrance/exit
  - Timestamp display
  - AI message metadata (confidence score, actionable flag)
  - Avatar icons (user icon vs Coro sparkles)
  - Color-coded UI (gradient for user, white/dark for AI)

#### **CoroTypingIndicator** (`components/coro/CoroTypingIndicator.tsx`)
- Animated typing indicator with three bouncing dots
- Gradient colored dots matching Coro's brand

### 2. **State Management**

#### **CoroContext** (`contexts/CoroContext.tsx`)
- React Context provider for global Coro state
- Features:
  - Message history management
  - Chat open/close state
  - Typing indicator state
  - Local storage persistence (auto-saves chat history)
  - Async message sending with error handling
  - Clear history functionality

Key functions:
- `openChat()` - Opens the chat interface
- `closeChat()` - Closes the chat interface
- `toggleChat()` - Toggles chat visibility
- `sendMessage(content)` - Sends a message to Coro (async)
- `clearHistory()` - Clears all messages and resets to welcome message

Message structure:
```typescript
interface CoroMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    confidence?: number
    sources?: string[]
    actionable?: boolean
  }
}
```

### 3. **Backend API**

#### **Chat Endpoint** (`app/api/coro/chat/route.ts`)
- Main AI chat API endpoint: `POST /api/coro/chat`
- Features:
  - OpenAI GPT-4o-mini integration
  - Intelligent fallback system (mock responses if API key not configured)
  - Full guardrails integration
  - Context management
  - Response validation
  - Error handling

Request format:
```typescript
{
  messages: Array<{
    role: 'user' | 'assistant' | 'system',
    content: string
  }>
}
```

Response format:
```typescript
{
  message: string,
  metadata: {
    confidence: number,
    actionable?: boolean,
    model?: string,
    mock?: boolean,
    sensitiveWarning?: string
  }
}
```

### 4. **Guardrails System**

#### **Guardrails Module** (`lib/coro/guardrails.ts`)
Comprehensive safety and quality control system for AI responses.

#### Content Filtering
- **Banned patterns**: Detects and blocks harmful content (hacking, stealing, illegal activities)
- **Sensitive topics**: Flags sensitive HR topics (terminations, discrimination, legal issues) for careful handling
- Returns clear feedback to users when content is blocked

#### Rate Limiting
- **Per-minute limit**: 10 messages per minute (configurable)
- **Per-hour limit**: 100 messages per hour (configurable)
- Prevents abuse and manages API costs
- Uses in-memory store (upgradable to Redis for production)

#### Context Management
- **Maximum context length**: 15 messages (configurable)
- Automatically trims old messages while preserving system prompts
- Prevents token overflow and manages costs

#### Response Validation
- Checks for empty or too-short responses
- Detects common AI failure patterns
- Validates response length
- Ensures quality before sending to user

#### System Prompt
Specialized prompt that defines Coro's personality and capabilities:
```
You are Coro, an AI assistant for LoopSync - an employee feedback
and culture management platform.

Your role is to help users:
- Understand employee feedback and sentiment
- Track and manage action items
- Analyze culture health metrics
- Provide insights on manager performance
- Identify risks and trends
- Suggest actionable improvements
```

Key guardrail functions:
- `checkBannedContent(content)` - Content filtering
- `checkSensitiveContent(content)` - Sensitive topic detection
- `checkRateLimit(userId, config)` - Rate limiting
- `manageContext(messages, maxLength)` - Context trimming
- `validateResponse(response)` - Response validation
- `runGuardrails(content, userId, config)` - Master function that runs all checks

### 5. **Integration**

#### Root Layout Integration
Coro is integrated at the app root level (`app/layout.tsx`):
```tsx
<CoroProvider>
  {children}
  <CoroOrb />
  <CoroChat />
</CoroProvider>
```

This ensures Coro is available on every page of the application.

#### Dashboard Integration
The "Ask Coro" button in the dashboard header (`components/dashboard/DashboardHeader.tsx`) is wired to open the chat:
```tsx
const { openChat } = useCoro()
<button onClick={openChat}>Ask Coro</button>
```

## Setup & Configuration

### 1. Environment Variables

Create a `.env.local` file in the project root:

```bash
# OpenAI API Key (required for full AI functionality)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Configure guardrails
CORO_MAX_MESSAGES_PER_MINUTE=10
CORO_MAX_MESSAGES_PER_HOUR=100
CORO_MAX_CONTEXT_LENGTH=15
```

### 2. Without API Key (Development Mode)
If `OPENAI_API_KEY` is not set, Coro will use intelligent mock responses based on keyword matching:
- Recognizes queries about feedback, actions, culture, managers, risks, and insights
- Provides helpful guidance to relevant dashboard sections
- Perfect for testing UI/UX without API costs

### 3. With API Key (Production Mode)
When configured with OpenAI API key:
- Uses GPT-4o-mini for cost-efficient, high-quality responses
- Full conversational AI capabilities
- Context-aware responses based on conversation history
- Guardrails ensure safe and appropriate responses

## Features

### User Experience
✅ **Always accessible** - Floating orb visible on every page
✅ **Visual feedback** - Notification badges for new messages
✅ **Smooth animations** - Professional entrance/exit effects
✅ **Keyboard shortcuts** - Enter to send, Shift+Enter for new line
✅ **Persistent history** - Chat history saved to localStorage
✅ **Responsive design** - Optimized for desktop (420px wide panel)
✅ **Dark mode support** - Automatically adapts to theme

### AI Capabilities
✅ **Context-aware** - Remembers conversation history (up to 15 messages)
✅ **LoopSync-specific** - Trained on platform features and terminology
✅ **Actionable insights** - Flags responses that suggest actions
✅ **Confidence scoring** - Shows how confident the AI is in its response
✅ **Sensitive topic handling** - Special care for HR-sensitive subjects

### Safety & Quality
✅ **Content filtering** - Blocks harmful or inappropriate content
✅ **Rate limiting** - Prevents abuse (10/min, 100/hr)
✅ **Response validation** - Ensures quality before sending
✅ **Error handling** - Graceful degradation on failures
✅ **Cost management** - Context trimming and smart model selection

## Usage Examples

### Basic Chat
1. Click the animated orb in the bottom-right corner
2. Type your question: "How can I analyze employee feedback?"
3. Coro responds with guidance and relevant dashboard sections

### Dashboard Integration
1. Click "Ask Coro" button in dashboard header
2. Ask about specific metrics: "What's a good culture health score?"
3. Get instant, contextual answers

### Actionable Insights
1. Ask: "What should I do about declining manager scores?"
2. Coro provides specific recommendations
3. Message is flagged as "actionable" with visual indicator

### Sensitive Topics
1. Ask about terminations, discrimination, or legal issues
2. Coro acknowledges sensitivity and suggests consulting HR
3. Warning appears in message metadata

## Customization

### Styling
All components use Tailwind CSS with consistent brand colors:
- Primary: `#E07850` (coral)
- Secondary: `#1B7F8E` (teal)
- Accent: `#06b6d4` (cyan)

### Guardrails Configuration
Adjust in `app/api/coro/chat/route.ts`:
```typescript
const GUARDRAILS_CONFIG: GuardrailsConfig = {
  maxMessagesPerMinute: 10,
  maxMessagesPerHour: 100,
  maxContextLength: 15,
  enableContentFiltering: true,
  enableRateLimiting: true
}
```

### System Prompt
Modify in `lib/coro/guardrails.ts` → `getCoroSystemPrompt()` function

### Mock Responses
Enhance pattern matching in `app/api/coro/chat/route.ts` → `getMockResponse()` function

## File Structure

```
/home/user/Nick2026v2/
├── app/
│   ├── api/
│   │   └── coro/
│   │       └── chat/
│   │           └── route.ts           # Main chat API endpoint
│   └── layout.tsx                     # Coro integration
├── components/
│   ├── coro/
│   │   ├── CoroOrb.tsx               # Floating orb component
│   │   ├── CoroChat.tsx              # Main chat interface
│   │   ├── CoroMessage.tsx           # Individual message component
│   │   └── CoroTypingIndicator.tsx   # Typing animation
│   └── dashboard/
│       └── DashboardHeader.tsx       # "Ask Coro" button integration
├── contexts/
│   └── CoroContext.tsx               # Global state management
├── lib/
│   └── coro/
│       └── guardrails.ts             # Safety and quality system
└── CORO_README.md                    # This file
```

## Future Enhancements

### Planned Features
- [ ] Voice input/output
- [ ] Suggested questions/prompts
- [ ] Rich message formatting (markdown, code blocks)
- [ ] File upload support
- [ ] Integration with dashboard data (show real metrics)
- [ ] Export chat history
- [ ] Multi-language support
- [ ] Mobile responsive design
- [ ] Keyboard navigation (accessibility)
- [ ] Message reactions/feedback

### Backend Improvements
- [ ] Redis-based rate limiting
- [ ] Database storage for chat history
- [ ] User authentication integration
- [ ] Analytics tracking (popular queries, satisfaction)
- [ ] A/B testing for system prompts
- [ ] Vector database for knowledge base
- [ ] Function calling for dashboard actions
- [ ] Streaming responses for faster perceived speed

## Troubleshooting

### Chat doesn't open
- Check browser console for errors
- Verify CoroProvider is wrapping the app
- Ensure no z-index conflicts with other modals

### API responses fail
- Check OPENAI_API_KEY in .env.local
- Verify API key is valid and has credits
- Check network connectivity
- Review API rate limits on OpenAI dashboard

### Messages not persisting
- Check browser localStorage support
- Verify localStorage is not disabled
- Clear cache if history is corrupted

### Rate limiting too strict
- Adjust config in route.ts
- Consider user-specific limits based on role
- Implement tier-based limits

### Styling issues
- Verify Tailwind CSS is configured correctly
- Check for CSS conflicts with global styles
- Ensure dark mode classes are applied

## Contributing

When adding new features to Coro:
1. Update relevant components in `components/coro/`
2. Modify context if state changes needed
3. Update guardrails if new safety rules required
4. Test both with and without API key
5. Update this documentation

## License

Part of the LoopSync Employee Feedback Platform.

---

**Built with ❤️ for better workplace culture**
