"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Activity,
  PieChart,
  Calendar,
  Download,
  Filter,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Zap,
  Target,
  Award,
  AlertCircle,
  Clock,
  Brain,
  Sparkles,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Hash,
  DollarSign,
  Percent,
  CheckCircle,
  Briefcase
} from "lucide-react"
import { useAuthStore } from "@/lib/auth"

// Chart data
const satisfactionTrend = [
  { month: "Jan", employee: 72, customer: 85 },
  { month: "Feb", employee: 75, customer: 82 },
  { month: "Mar", employee: 71, customer: 88 },
  { month: "Apr", employee: 78, customer: 86 },
  { month: "May", employee: 82, customer: 84 },
  { month: "Jun", employee: 78, customer: 87 }
]

const feedbackVolume = [
  { week: "W1", volume: 145, positive: 89, negative: 32, neutral: 24 },
  { week: "W2", volume: 162, positive: 98, negative: 41, neutral: 23 },
  { week: "W3", volume: 138, positive: 82, negative: 35, neutral: 21 },
  { week: "W4", volume: 175, positive: 112, negative: 38, neutral: 25 }
]

const departmentMetrics = [
  { name: "Engineering", satisfaction: 70, engagement: 82, feedback: 45, trend: "down" },
  { name: "Sales", satisfaction: 85, engagement: 91, feedback: 28, trend: "up" },
  { name: "Marketing", satisfaction: 75, engagement: 78, feedback: 12, trend: "stable" },
  { name: "Product", satisfaction: 90, engagement: 88, feedback: 18, trend: "up" },
  { name: "Customer Success", satisfaction: 68, engagement: 75, feedback: 32, trend: "down" }
]

const topTopics = [
  { topic: "Work-life balance", mentions: 87, sentiment: "negative", change: -12 },
  { topic: "Product quality", mentions: 76, sentiment: "positive", change: 18 },
  { topic: "Team collaboration", mentions: 64, sentiment: "positive", change: 8 },
  { topic: "Career growth", mentions: 58, sentiment: "neutral", change: -5 },
  { topic: "Customer support", mentions: 52, sentiment: "positive", change: 22 }
]

const aiInsights = [
  {
    id: 1,
    type: "warning",
    title: "Engineering Satisfaction Declining",
    description: "Employee satisfaction in Engineering has dropped 8% over the past month. Primary concerns include deployment stress and work-life balance.",
    impact: "high",
    affectedCount: 45,
    recommendation: "Schedule team retrospective and consider implementing deployment automation",
    confidence: 92
  },
  {
    id: 2,
    type: "opportunity",
    title: "Sales Team Momentum",
    description: "Sales team satisfaction is up 12% with positive feedback about new commission structure.",
    impact: "medium",
    affectedCount: 28,
    recommendation: "Share success story company-wide to boost morale",
    confidence: 88
  },
  {
    id: 3,
    type: "trend",
    title: "Customer Churn Risk Detected",
    description: "3 enterprise customers showing declining engagement patterns similar to previous churns.",
    impact: "critical",
    affectedCount: 3,
    recommendation: "Immediate executive outreach and account review recommended",
    confidence: 95
  }
]

export default function AnalyticsPage() {
  const { user } = useAuthStore()
  const [timeRange, setTimeRange] = useState("30d")
  const [viewMode, setViewMode] = useState<"overview" | "trends" | "ai-insights">("overview")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Calculate key metrics
  const metrics = {
    overallSatisfaction: 78,
    satisfactionChange: 3.2,
    activeLoops: 23,
    loopsChange: -5,
    responseTime: "2.4h",
    responseChange: -15,
    participation: 67,
    participationChange: 8
  }

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <ThumbsUp className="text-[#14b8a6]" size={20} />
            <span className={`text-xs flex items-center gap-1 ${
              metrics.satisfactionChange > 0 ? "text-green-600" : "text-red-600"
            }`}>
              {metrics.satisfactionChange > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(metrics.satisfactionChange)}%
            </span>
          </div>
          <p className="text-2xl font-bold gradient-text">{metrics.overallSatisfaction}%</p>
          <p className="text-xs text-[#666666] mt-1">Overall Satisfaction</p>
          <div className="mt-3 h-1 bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]"
              style={{ width: `${metrics.overallSatisfaction}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-[#06b6d4]" size={20} />
            <span className={`text-xs flex items-center gap-1 ${
              metrics.loopsChange < 0 ? "text-green-600" : "text-red-600"
            }`}>
              {metrics.loopsChange > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(metrics.loopsChange)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{metrics.activeLoops}</p>
          <p className="text-xs text-[#666666] mt-1">Active Loops</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-[#3b82f6]" size={20} />
            <span className={`text-xs flex items-center gap-1 ${
              metrics.responseChange < 0 ? "text-green-600" : "text-red-600"
            }`}>
              {metrics.responseChange > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(metrics.responseChange)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{metrics.responseTime}</p>
          <p className="text-xs text-[#666666] mt-1">Avg Response Time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="text-[#8b5cf6]" size={20} />
            <span className={`text-xs flex items-center gap-1 ${
              metrics.participationChange > 0 ? "text-green-600" : "text-red-600"
            }`}>
              {metrics.participationChange > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {Math.abs(metrics.participationChange)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{metrics.participation}%</p>
          <p className="text-xs text-[#666666] mt-1">Participation Rate</p>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("overview")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === "overview"
                    ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white"
                    : "hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode("trends")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === "trends"
                    ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white"
                    : "hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]"
                }`}
              >
                Trends
              </button>
              <button
                onClick={() => setViewMode("ai-insights")}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === "ai-insights"
                    ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white"
                    : "hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]"
                }`}
              >
                <Brain className="inline mr-1" size={14} />
                AI Insights
              </button>
            </div>

            {/* Time Range */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="glass-input px-3 py-1.5 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="glass-input px-3 py-1.5 text-sm"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="product">Product</option>
              <option value="customer-success">Customer Success</option>
            </select>
          </div>

          <button className="glass-button flex items-center gap-2">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Main Content based on view mode */}
      {viewMode === "overview" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Satisfaction Trend Chart */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">
              Satisfaction Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {satisfactionTrend.map((month, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1">
                    <div className="flex-1 bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-t-lg relative">
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-[#14b8a6] to-[#06b6d4] rounded-t-lg"
                        style={{ height: `${month.employee}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-t-lg relative">
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-[#3b82f6] to-[#8b5cf6] rounded-t-lg"
                        style={{ height: `${month.customer}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-[#666666]">{month.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]"></div>
                <span className="text-xs text-[#666666]">Employee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"></div>
                <span className="text-xs text-[#666666]">Customer</span>
              </div>
            </div>
          </div>

          {/* Feedback Volume */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">
              Weekly Feedback Volume
            </h3>
            <div className="space-y-3">
              {feedbackVolume.map((week, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#666666]">{week.week}</span>
                    <span className="text-xs font-medium">{week.volume} messages</span>
                  </div>
                  <div className="flex h-6 bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="bg-green-500"
                      style={{ width: `${(week.positive / week.volume) * 100}%` }}
                    />
                    <div
                      className="bg-yellow-500"
                      style={{ width: `${(week.neutral / week.volume) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(week.negative / week.volume) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-[#666666]">Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-[#666666]">Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs text-[#666666]">Negative</span>
              </div>
            </div>
          </div>

          {/* Department Performance */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">
              Department Performance
            </h3>
            <div className="space-y-3">
              {departmentMetrics.map((dept, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center text-xs text-white font-medium">
                      {dept.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{dept.name}</p>
                      <p className="text-xs text-[#666666]">{dept.feedback} feedback items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{dept.satisfaction}%</p>
                      <p className="text-xs text-[#666666]">satisfaction</p>
                    </div>
                    {dept.trend === "up" ? (
                      <TrendingUp className="text-green-500" size={16} />
                    ) : dept.trend === "down" ? (
                      <TrendingDown className="text-red-500" size={16} />
                    ) : (
                      <ChevronRight className="text-gray-400" size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Topics */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">
              Trending Topics
            </h3>
            <div className="space-y-3">
              {topTopics.map((topic, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{topic.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        topic.sentiment === "positive"
                          ? "bg-green-100 text-green-600"
                          : topic.sentiment === "negative"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {topic.sentiment}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${
                        topic.change > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {topic.change > 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                        {Math.abs(topic.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="text-[#666666]" size={12} />
                    <span className="text-xs text-[#666666]">{topic.mentions} mentions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "trends" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Trend Analysis */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">
              6-Month Satisfaction Trend Analysis
            </h3>
            <div className="h-80 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-rows-5 gap-0">
                {[100, 80, 60, 40, 20].map((value) => (
                  <div key={value} className="border-b border-[#E5E5E5] dark:border-[#202020] relative">
                    <span className="absolute -left-10 -top-2 text-xs text-[#666666]">{value}%</span>
                  </div>
                ))}
              </div>

              {/* Line Chart */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Employee Line */}
                <polyline
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  points="20,96 96,80 172,104 248,64 324,48 400,64"
                />
                {/* Customer Line */}
                <polyline
                  fill="none"
                  stroke="url(#gradient2)"
                  strokeWidth="3"
                  points="20,32 96,48 172,24 248,32 324,40 400,28"
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Data Points */}
                {satisfactionTrend.map((month, idx) => (
                  <g key={idx}>
                    <circle
                      cx={20 + idx * 76}
                      cy={240 - (month.employee * 2.4)}
                      r="4"
                      fill="#14b8a6"
                      className="cursor-pointer hover:r-6"
                    />
                    <circle
                      cx={20 + idx * 76}
                      cy={240 - (month.customer * 2.4)}
                      r="4"
                      fill="#3b82f6"
                      className="cursor-pointer hover:r-6"
                    />
                  </g>
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                {satisfactionTrend.map((month) => (
                  <span key={month.month} className="text-xs text-[#666666]">{month.month}</span>
                ))}
              </div>
            </div>

            {/* Trend Insights */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-[#14b8a6]" size={16} />
                  <span className="text-sm font-medium">Employee Trend</span>
                </div>
                <p className="text-xs text-[#666666]">
                  Recovering from April low, up 4% this month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="text-[#3b82f6]" size={16} />
                  <span className="text-sm font-medium">Customer Trend</span>
                </div>
                <p className="text-xs text-[#666666]">
                  Stable at 85-88% range, slight uptick expected
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === "ai-insights" && (
        <div className="space-y-4">
          {/* AI Insights Header */}
          <div className="glass-card p-4 bg-gradient-to-r from-[#14b8a6]/10 to-[#06b6d4]/10">
            <div className="flex items-center gap-3">
              <Brain className="text-[#14b8a6]" size={24} />
              <div>
                <h3 className="font-semibold text-sm text-[#202020] dark:text-white">
                  AI-Powered Insights
                </h3>
                <p className="text-xs text-[#666666]">
                  Coro AI analyzed {Math.floor(Math.random() * 500 + 1000)} data points to generate these insights
                </p>
              </div>
              <Sparkles className="ml-auto text-[#06b6d4]" size={20} />
            </div>
          </div>

          {/* Insight Cards */}
          {aiInsights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: insight.id * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-lg ${
                  insight.type === "warning"
                    ? "bg-amber-100 dark:bg-amber-900/20"
                    : insight.type === "opportunity"
                    ? "bg-green-100 dark:bg-green-900/20"
                    : "bg-blue-100 dark:bg-blue-900/20"
                }`}>
                  {insight.type === "warning" ? (
                    <AlertCircle className="text-amber-600" size={20} />
                  ) : insight.type === "opportunity" ? (
                    <TrendingUp className="text-green-600" size={20} />
                  ) : (
                    <Target className="text-blue-600" size={20} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#202020] dark:text-white">
                      {insight.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.impact === "critical"
                        ? "bg-red-100 text-red-600"
                        : insight.impact === "high"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {insight.impact} impact
                    </span>
                  </div>

                  <p className="text-sm text-[#666666] mb-3">
                    {insight.description}
                  </p>

                  <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a] mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="text-[#14b8a6]" size={14} />
                      <span className="text-xs font-medium text-[#202020] dark:text-white">
                        Recommended Action
                      </span>
                    </div>
                    <p className="text-xs text-[#666666]">
                      {insight.recommendation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#666666]">
                        Affects {insight.affectedCount} {insight.affectedCount === 1 ? "item" : "items"}
                      </span>
                      <span className="text-xs text-[#666666]">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <button className="glass-button-primary px-3 py-1 text-xs">
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* AI Analysis Summary */}
          <div className="glass-card p-6 bg-gradient-to-br from-[#14b8a6]/5 to-[#06b6d4]/5">
            <h4 className="font-semibold text-sm mb-3 text-[#202020] dark:text-white">
              Analysis Summary
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold gradient-text">3</p>
                <p className="text-xs text-[#666666]">Critical Issues</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#202020] dark:text-white">8</p>
                <p className="text-xs text-[#666666]">Opportunities</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#202020] dark:text-white">91%</p>
                <p className="text-xs text-[#666666]">Avg Confidence</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}