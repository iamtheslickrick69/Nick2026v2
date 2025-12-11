import { create } from "zustand"

// Types for our store
export type FeedbackSource = "all" | "employee" | "customer"
export type FeedbackSentiment = "all" | "positive" | "neutral" | "negative"
export type FeedbackPriority = "all" | "critical" | "concern" | "general"
export type TimeRange = "1h" | "today" | "7d" | "30d" | "custom"

export interface FeedFilters {
  source: FeedbackSource
  sentiment: FeedbackSentiment
  priority: FeedbackPriority
  departments: string[]
  segments: string[]
  timeRange: TimeRange
  customDateRange?: { start: Date; end: Date }
}

export interface SelectedFeedback {
  id: string
  source: "employee" | "customer"
  department?: string
  segment?: string
  message: string
  sentiment: string
  priority: string
  timestamp: Date
  anonymityLevel: string
  tags: string[]
}

export interface SelectedRisk {
  id: string
  type: string
  severity: string
  title: string
  description: string
  signals: string[]
  detectedDate: Date
  affectedCount: number
  relatedFeedbackIds: string[]
}

export interface ActionItem {
  id: string
  title: string
  status: "pending" | "in_progress" | "completed"
  owner: string
  dueDate: Date
  progress: number
  relatedMessages: number
  impact?: string
  notes?: string
}

interface DashboardStore {
  // Feed Filters
  feedFilters: FeedFilters
  setFeedSource: (source: FeedbackSource) => void
  setFeedSentiment: (sentiment: FeedbackSentiment) => void
  setFeedPriority: (priority: FeedbackPriority) => void
  setFeedDepartments: (departments: string[]) => void
  setFeedSegments: (segments: string[]) => void
  setFeedTimeRange: (timeRange: TimeRange) => void
  resetFeedFilters: () => void

  // Selected Department (for cross-component linking)
  selectedDepartment: string | null
  setSelectedDepartment: (dept: string | null) => void

  // Active Modals/Panels
  feedbackDetailPanel: SelectedFeedback | null
  setFeedbackDetailPanel: (feedback: SelectedFeedback | null) => void

  riskDetailExpanded: string | null // risk ID
  setRiskDetailExpanded: (riskId: string | null) => void

  actionEditorModal: ActionItem | null
  setActionEditorModal: (action: ActionItem | null) => void

  trendAnalysisModal: boolean
  setTrendAnalysisModal: (open: boolean) => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void

  // Quick Actions
  unaddressedCriticalCount: number
  actionsDueThisWeek: number

  // Digest
  dismissedDigestIds: string[]
  dismissDigestItem: (id: string) => void
}

const defaultFilters: FeedFilters = {
  source: "all",
  sentiment: "all",
  priority: "all",
  departments: [],
  segments: [],
  timeRange: "7d",
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Initial State
  feedFilters: defaultFilters,
  selectedDepartment: null,
  feedbackDetailPanel: null,
  riskDetailExpanded: null,
  actionEditorModal: null,
  trendAnalysisModal: false,
  searchQuery: "",
  searchOpen: false,
  unaddressedCriticalCount: 3,
  actionsDueThisWeek: 5,
  dismissedDigestIds: [],

  // Feed Filter Actions
  setFeedSource: (source) =>
    set((state) => ({
      feedFilters: { ...state.feedFilters, source },
    })),

  setFeedSentiment: (sentiment) =>
    set((state) => ({
      feedFilters: { ...state.feedFilters, sentiment },
    })),

  setFeedPriority: (priority) =>
    set((state) => ({
      feedFilters: { ...state.feedFilters, priority },
    })),

  setFeedDepartments: (departments) =>
    set((state) => ({
      feedFilters: { ...state.feedFilters, departments },
    })),

  setFeedSegments: (segments) =>
    set((state) => ({
      feedFilters: { ...state.feedFilters, segments },
    })),

  setFeedTimeRange: (timeRange) =>
    set((state) => ({
      feedFilters: { ...state.feedFilters, timeRange },
    })),

  resetFeedFilters: () => set({ feedFilters: defaultFilters, selectedDepartment: null }),

  // Selected Department
  setSelectedDepartment: (dept) => set({ selectedDepartment: dept }),

  // Modals/Panels
  setFeedbackDetailPanel: (feedback) => set({ feedbackDetailPanel: feedback }),
  setRiskDetailExpanded: (riskId) => set({ riskDetailExpanded: riskId }),
  setActionEditorModal: (action) => set({ actionEditorModal: action }),
  setTrendAnalysisModal: (open) => set({ trendAnalysisModal: open }),

  // Search
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchOpen: (open) => set({ searchOpen: open }),

  // Digest
  dismissDigestItem: (id) =>
    set((state) => ({
      dismissedDigestIds: [...state.dismissedDigestIds, id],
    })),
}))
