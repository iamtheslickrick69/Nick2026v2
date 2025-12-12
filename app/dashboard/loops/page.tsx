"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  UserCheck,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Users,
  MessageSquare,
  Building,
  Tag,
  Star,
  Archive,
  MoreVertical,
  Zap,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Target,
  Activity,
  Award,
  BarChart3,
  Timer,
  Flag,
  XCircle
} from "lucide-react"
import { useAuthStore } from "@/lib/auth"

// Loop stages with detailed tracking
const loopStages = [
  {
    id: "new",
    title: "New Feedback",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  {
    id: "acknowledged",
    title: "Acknowledged",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800"
  },
  {
    id: "in_progress",
    title: "In Progress",
    color: "from-[#14b8a6] to-[#06b6d4]",
    bgColor: "bg-[#14b8a6]/10 dark:bg-[#14b8a6]/20",
    borderColor: "border-[#14b8a6]/30"
  },
  {
    id: "resolved",
    title: "Resolved",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800"
  }
]

// Enhanced loop data with full tracking
const loops = [
  {
    id: 1,
    title: "Improve onboarding documentation",
    description: "Multiple employees mentioned the onboarding docs are outdated",
    type: "employee",
    stage: "in_progress",
    priority: "high",
    category: "Documentation",
    department: "HR",
    initiator: {
      name: "Sarah Johnson",
      role: "Senior Engineer",
      avatar: "SJ"
    },
    assignee: {
      name: "Marcus Johnson",
      role: "HR Manager",
      avatar: "MJ"
    },
    created: "2024-01-25 09:00 AM",
    updated: "2024-01-26 02:30 PM",
    dueDate: "2024-01-30",
    feedback: [
      { id: 1, person: "Sarah Johnson", message: "The setup instructions are missing key steps", sentiment: "negative" },
      { id: 2, person: "Mike Chen", message: "I had to ask colleagues for help", sentiment: "negative" },
      { id: 3, person: "Emily Rodriguez", message: "Would be great to have video tutorials", sentiment: "neutral" }
    ],
    metrics: {
      mentions: 12,
      urgencyScore: 8.5,
      impactScore: 9.0,
      effortEstimate: "3 days",
      affectedUsers: 45
    },
    timeline: [
      { action: "Created", time: "Jan 25, 9:00 AM", user: "System" },
      { action: "Assigned to Marcus Johnson", time: "Jan 25, 9:15 AM", user: "Admin" },
      { action: "Status changed to In Progress", time: "Jan 26, 2:30 PM", user: "Marcus Johnson" }
    ],
    tags: ["onboarding", "documentation", "hr", "priority"]
  },
  {
    id: 2,
    title: "Product shipping delays",
    description: "Customers reporting consistent delays in shipping times",
    type: "customer",
    stage: "acknowledged",
    priority: "critical",
    category: "Operations",
    department: "Logistics",
    initiator: {
      name: "David Park",
      role: "VIP Customer",
      avatar: "DP"
    },
    assignee: {
      name: "Lisa Anderson",
      role: "Operations Lead",
      avatar: "LA"
    },
    created: "2024-01-26 11:00 AM",
    updated: "2024-01-26 11:30 AM",
    dueDate: "2024-01-28",
    feedback: [
      { id: 1, person: "David Park", message: "My last 3 orders were all late", sentiment: "negative" },
      { id: 2, person: "Jane Smith", message: "Shipping times are getting worse", sentiment: "negative" },
      { id: 3, person: "Robert Lee", message: "This is affecting my business", sentiment: "negative" }
    ],
    metrics: {
      mentions: 28,
      urgencyScore: 9.5,
      impactScore: 10.0,
      effortEstimate: "1 week",
      affectedUsers: 156
    },
    timeline: [
      { action: "Created", time: "Jan 26, 11:00 AM", user: "System" },
      { action: "Priority set to Critical", time: "Jan 26, 11:15 AM", user: "Admin" },
      { action: "Acknowledged by Lisa Anderson", time: "Jan 26, 11:30 AM", user: "Lisa Anderson" }
    ],
    tags: ["shipping", "critical", "customer", "operations"]
  },
  {
    id: 3,
    title: "Break room amenities upgrade",
    description: "Request for better coffee machine and seating",
    type: "employee",
    stage: "new",
    priority: "low",
    category: "Facilities",
    department: "Admin",
    initiator: {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      avatar: "ER"
    },
    assignee: null,
    created: "2024-01-26 03:00 PM",
    updated: "2024-01-26 03:00 PM",
    dueDate: null,
    feedback: [
      { id: 1, person: "Emily Rodriguez", message: "The coffee machine keeps breaking", sentiment: "neutral" },
      { id: 2, person: "Tom Wilson", message: "Would love more comfortable seating", sentiment: "neutral" }
    ],
    metrics: {
      mentions: 5,
      urgencyScore: 3.0,
      impactScore: 4.5,
      effortEstimate: "2 days",
      affectedUsers: 25
    },
    timeline: [
      { action: "Created", time: "Jan 26, 3:00 PM", user: "System" }
    ],
    tags: ["facilities", "employee-wellness", "low-priority"]
  },
  {
    id: 4,
    title: "Mobile app performance issues",
    description: "App crashes frequently on older devices",
    type: "customer",
    stage: "in_progress",
    priority: "high",
    category: "Technology",
    department: "Engineering",
    initiator: {
      name: "Alex Kumar",
      role: "Customer",
      avatar: "AK"
    },
    assignee: {
      name: "Sarah Johnson",
      role: "Senior Engineer",
      avatar: "SJ"
    },
    created: "2024-01-24 02:00 PM",
    updated: "2024-01-26 10:00 AM",
    dueDate: "2024-01-29",
    feedback: [
      { id: 1, person: "Alex Kumar", message: "App crashes when I try to checkout", sentiment: "negative" },
      { id: 2, person: "Maria Garcia", message: "Very slow on my phone", sentiment: "negative" },
      { id: 3, person: "John Doe", message: "Unusable on Android 10", sentiment: "negative" }
    ],
    metrics: {
      mentions: 34,
      urgencyScore: 8.0,
      impactScore: 8.5,
      effortEstimate: "5 days",
      affectedUsers: 230
    },
    timeline: [
      { action: "Created", time: "Jan 24, 2:00 PM", user: "System" },
      { action: "Assigned to Engineering", time: "Jan 24, 2:30 PM", user: "Admin" },
      { action: "Investigation started", time: "Jan 25, 9:00 AM", user: "Sarah Johnson" },
      { action: "Root cause identified", time: "Jan 26, 10:00 AM", user: "Sarah Johnson" }
    ],
    tags: ["mobile", "performance", "engineering", "customer"]
  },
  {
    id: 5,
    title: "Positive feedback on customer service",
    description: "Multiple customers praising support team",
    type: "customer",
    stage: "resolved",
    priority: "low",
    category: "Service",
    department: "Support",
    initiator: {
      name: "Jennifer White",
      role: "Customer",
      avatar: "JW"
    },
    assignee: {
      name: "Support Team",
      role: "Team",
      avatar: "ST"
    },
    created: "2024-01-20 10:00 AM",
    updated: "2024-01-25 04:00 PM",
    dueDate: "2024-01-25",
    feedback: [
      { id: 1, person: "Jennifer White", message: "Best customer service I've experienced!", sentiment: "positive" },
      { id: 2, person: "Michael Brown", message: "Support team went above and beyond", sentiment: "positive" },
      { id: 3, person: "Lisa Chen", message: "Quick and helpful responses", sentiment: "positive" }
    ],
    metrics: {
      mentions: 15,
      urgencyScore: 2.0,
      impactScore: 7.0,
      effortEstimate: "0 days",
      affectedUsers: 15
    },
    timeline: [
      { action: "Created", time: "Jan 20, 10:00 AM", user: "System" },
      { action: "Acknowledged", time: "Jan 20, 11:00 AM", user: "Support Team" },
      { action: "Shared with team", time: "Jan 22, 9:00 AM", user: "Admin" },
      { action: "Resolved - Team recognized", time: "Jan 25, 4:00 PM", user: "Admin" }
    ],
    tags: ["positive", "customer-service", "recognition"]
  }
]

export default function LoopTrackerPage() {
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "employee" | "customer">("all")
  const [filterPriority, setFilterPriority] = useState<"all" | "critical" | "high" | "medium" | "low">("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [selectedLoop, setSelectedLoop] = useState<typeof loops[0] | null>(null)
  const [viewMode, setViewMode] = useState<"pipeline" | "list" | "metrics">("pipeline")

  // Filter loops
  const filteredLoops = loops.filter(loop => {
    const matchesSearch = loop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || loop.type === filterType
    const matchesPriority = filterPriority === "all" || loop.priority === filterPriority
    const matchesDepartment = filterDepartment === "all" || loop.department === filterDepartment
    return matchesSearch && matchesType && matchesPriority && matchesDepartment
  })

  // Group loops by stage for pipeline view
  const loopsByStage = loopStages.map(stage => ({
    ...stage,
    loops: filteredLoops.filter(loop => loop.stage === stage.id)
  }))

  // Calculate metrics
  const metrics = {
    totalLoops: loops.length,
    openLoops: loops.filter(l => l.stage !== 'resolved').length,
    avgResolutionTime: "3.2 days",
    satisfactionScore: 85,
    criticalIssues: loops.filter(l => l.priority === 'critical').length,
    weeklyTrend: "+12%",
    participationRate: "78%",
    impactedUsers: loops.reduce((acc, l) => acc + l.metrics.affectedUsers, 0)
  }

  const handleDragStart = (e: React.DragEvent, loop: typeof loops[0]) => {
    e.dataTransfer.setData('loopId', loop.id.toString())
  }

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    const loopId = e.dataTransfer.getData('loopId')
    console.log(`Moving loop ${loopId} to ${stageId}`)
    // In production, would update via API
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-[#14b8a6]" size={20} />
            <span className="text-xs text-green-600 flex items-center gap-1">
              <ArrowUp size={12} /> {metrics.weeklyTrend}
            </span>
          </div>
          <p className="text-2xl font-bold gradient-text">{metrics.openLoops}</p>
          <p className="text-xs text-[#666666] mt-1">Open Loops</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Timer className="text-[#06b6d4]" size={20} />
            <span className="text-xs text-[#666666]">Average</span>
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{metrics.avgResolutionTime}</p>
          <p className="text-xs text-[#666666] mt-1">Resolution Time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="text-[#3b82f6]" size={20} />
            <span className="text-xs text-[#666666]">{metrics.participationRate}</span>
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{metrics.satisfactionScore}%</p>
          <p className="text-xs text-[#666666] mt-1">Satisfaction Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <Flag className="text-red-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-red-500">{metrics.criticalIssues}</p>
          <p className="text-xs text-[#666666] mt-1">Critical Issues</p>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === 'pipeline'
                    ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white'
                    : 'hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]'
                }`}
              >
                Pipeline
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white'
                    : 'hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('metrics')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  viewMode === 'metrics'
                    ? 'bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white'
                    : 'hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]'
                }`}
              >
                Metrics
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                placeholder="Search loops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 py-2 text-sm w-64"
              />
            </div>

            {/* Filters */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="employee">Employee</option>
              <option value="customer">Customer</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">All Departments</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Logistics">Logistics</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <button className="glass-button-primary px-4 py-2 text-sm">
            Create Loop
          </button>
        </div>
      </div>

      {/* Main Content based on view mode */}
      {viewMode === 'pipeline' && (
        <div className="grid grid-cols-4 gap-4">
          {loopsByStage.map((stage) => (
            <div
              key={stage.id}
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragOver={handleDragOver}
              className="glass-card p-4"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stage.color}`}></div>
                  <h3 className="font-medium text-sm">{stage.title}</h3>
                  <span className="text-xs text-[#666666] px-2 py-0.5 rounded-full bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                    {stage.loops.length}
                  </span>
                </div>
              </div>

              {/* Loop Cards */}
              <div className="space-y-3">
                {stage.loops.map((loop) => (
                  <motion.div
                    key={loop.id}
                    draggable
                    onDragStart={(e: any) => handleDragStart(e as React.DragEvent, loop)}
                    onClick={() => setSelectedLoop(loop)}
                    whileHover={{ scale: 1.02 }}
                    whileDrag={{ scale: 1.05, opacity: 0.8 }}
                    className={`p-3 rounded-lg border ${stage.borderColor} ${stage.bgColor} cursor-move hover:shadow-lg transition-all`}
                  >
                    {/* Priority Badge */}
                    {loop.priority === 'critical' && (
                      <div className="flex items-center gap-1 mb-2">
                        <Flag size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-600">Critical</span>
                      </div>
                    )}

                    {/* Title */}
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">
                      {loop.title}
                    </h4>

                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        loop.type === 'employee'
                          ? 'bg-[#14b8a6]/20 text-[#14b8a6]'
                          : 'bg-[#3b82f6]/20 text-[#3b82f6]'
                      }`}>
                        {loop.type}
                      </span>
                      <span className="text-xs text-[#666666]">
                        {loop.department}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Users size={12} className="text-[#666666]" />
                        <span className="text-xs text-[#666666]">
                          {loop.metrics.affectedUsers}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-[#666666]" />
                        <span className="text-xs text-[#666666]">
                          {loop.metrics.mentions}
                        </span>
                      </div>
                    </div>

                    {/* Assignee */}
                    {loop.assignee && (
                      <div className="flex items-center gap-2 pt-2 border-t border-[#E5E5E5]/50">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center text-[10px] text-white">
                          {loop.assignee.avatar}
                        </div>
                        <span className="text-xs text-[#666666]">
                          {loop.assignee.name}
                        </span>
                      </div>
                    )}

                    {/* Due Date */}
                    {loop.dueDate && (
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar size={12} className="text-[#666666]" />
                        <span className="text-xs text-[#666666]">
                          Due {loop.dueDate}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {stage.loops.length === 0 && (
                <div className="text-center py-8 text-[#999999]">
                  <p className="text-sm">No loops in this stage</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="glass-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#202020]">
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Title</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Type</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Priority</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Stage</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Assignee</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Impact</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Due Date</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoops.map((loop) => (
                <tr
                  key={loop.id}
                  className="border-b border-[#E5E5E5] dark:border-[#202020] hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] transition-all"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium">{loop.title}</p>
                      <p className="text-xs text-[#666666] mt-1">{loop.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      loop.type === 'employee'
                        ? 'bg-[#14b8a6]/10 text-[#14b8a6]'
                        : 'bg-[#3b82f6]/10 text-[#3b82f6]'
                    }`}>
                      {loop.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      loop.priority === 'critical' ? 'bg-red-100 text-red-600' :
                      loop.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                      loop.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {loop.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs capitalize">{loop.stage.replace('_', ' ')}</span>
                  </td>
                  <td className="p-4">
                    {loop.assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center text-[10px] text-white">
                          {loop.assignee.avatar}
                        </div>
                        <span className="text-xs">{loop.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#666666]">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#666666]" />
                      <span className="text-xs">{loop.metrics.affectedUsers}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs">{loop.dueDate || '-'}</span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedLoop(loop)}
                      className="p-1.5 hover:bg-[#F5F3F0] dark:hover:bg-[#202020] rounded-lg transition-all"
                    >
                      <MoreVertical size={16} className="text-[#666666]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'metrics' && (
        <div className="grid grid-cols-3 gap-6">
          {/* Impact vs Urgency Matrix */}
          <div className="glass-card p-6 col-span-2">
            <h3 className="font-semibold text-sm mb-4">Impact vs Urgency Matrix</h3>
            <div className="relative h-80 border-2 border-[#E5E5E5] dark:border-[#202020] rounded-lg">
              {/* Quadrant Labels */}
              <div className="absolute top-2 left-2 text-xs text-[#666666]">Low Impact</div>
              <div className="absolute top-2 right-2 text-xs text-[#666666]">High Impact</div>
              <div className="absolute bottom-2 left-2 text-xs text-[#666666]">Low Urgency</div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-[#666666]">High Urgency</div>

              {/* Plot Points */}
              {filteredLoops.map((loop) => (
                <div
                  key={loop.id}
                  className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${(loop.metrics.impactScore / 10) * 100}%`,
                    bottom: `${(loop.metrics.urgencyScore / 10) * 100}%`
                  }}
                  onClick={() => setSelectedLoop(loop)}
                >
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-xs font-medium text-white ${
                    loop.priority === 'critical' ? 'bg-red-500' :
                    loop.priority === 'high' ? 'bg-orange-500' :
                    loop.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}>
                    {loop.id}
                  </div>
                </div>
              ))}

              {/* Quadrant Grid */}
              <div className="absolute top-0 left-1/2 w-px h-full bg-[#E5E5E5] dark:bg-[#202020]"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-[#E5E5E5] dark:bg-[#202020]"></div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-sm mb-4">Category Distribution</h3>
            <div className="space-y-3">
              {['Documentation', 'Operations', 'Technology', 'Facilities', 'Service'].map((category) => {
                const count = loops.filter(l => l.category === category).length
                const percentage = (count / loops.length) * 100
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#666666]">{category}</span>
                      <span className="text-xs font-medium">{count}</span>
                    </div>
                    <div className="w-full h-2 bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Loop Detail Modal */}
      <AnimatePresence>
        {selectedLoop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLoop(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[#E5E5E5] dark:border-[#202020]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{selectedLoop.title}</h2>
                    <p className="text-sm text-[#666666]">{selectedLoop.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        selectedLoop.type === 'employee'
                          ? 'bg-[#14b8a6]/10 text-[#14b8a6]'
                          : 'bg-[#3b82f6]/10 text-[#3b82f6]'
                      }`}>
                        {selectedLoop.type}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        selectedLoop.priority === 'critical' ? 'bg-red-100 text-red-600' :
                        selectedLoop.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                        selectedLoop.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {selectedLoop.priority} priority
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        {selectedLoop.department}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLoop(null)}
                    className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-all"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Feedback */}
                  <div>
                    <h3 className="font-medium text-sm mb-3">Original Feedback</h3>
                    <div className="space-y-2">
                      {selectedLoop.feedback.map((fb) => (
                        <div key={fb.id} className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">{fb.person}</span>
                            <span className={`text-xs ${
                              fb.sentiment === 'positive' ? 'text-green-600' :
                              fb.sentiment === 'negative' ? 'text-red-600' :
                              'text-[#666666]'
                            }`}>
                              {fb.sentiment}
                            </span>
                          </div>
                          <p className="text-sm text-[#666666]">{fb.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="font-medium text-sm mb-3">Activity Timeline</h3>
                    <div className="space-y-2">
                      {selectedLoop.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#14b8a6] mt-1.5"></div>
                          <div className="flex-1">
                            <p className="text-sm">{event.action}</p>
                            <p className="text-xs text-[#666666]">
                              {event.time} by {event.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Metrics */}
                  <div>
                    <h3 className="font-medium text-sm mb-3">Impact Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        <p className="text-xs text-[#666666] mb-1">Mentions</p>
                        <p className="text-lg font-bold gradient-text">{selectedLoop.metrics.mentions}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        <p className="text-xs text-[#666666] mb-1">Affected Users</p>
                        <p className="text-lg font-bold text-[#202020] dark:text-white">{selectedLoop.metrics.affectedUsers}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        <p className="text-xs text-[#666666] mb-1">Urgency Score</p>
                        <p className="text-lg font-bold text-orange-500">{selectedLoop.metrics.urgencyScore}/10</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        <p className="text-xs text-[#666666] mb-1">Impact Score</p>
                        <p className="text-lg font-bold text-[#3b82f6]">{selectedLoop.metrics.impactScore}/10</p>
                      </div>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div>
                    <h3 className="font-medium text-sm mb-3">Assignment</h3>
                    <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                      {selectedLoop.assignee ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center text-white font-medium">
                            {selectedLoop.assignee.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{selectedLoop.assignee.name}</p>
                            <p className="text-xs text-[#666666]">{selectedLoop.assignee.role}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-[#666666]">Unassigned</p>
                      )}

                      {selectedLoop.dueDate && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E5E5] dark:border-[#202020]">
                          <Calendar size={14} className="text-[#666666]" />
                          <span className="text-xs text-[#666666]">Due: {selectedLoop.dueDate}</span>
                        </div>
                      )}

                      <p className="text-xs text-[#666666] mt-2">
                        Effort Estimate: {selectedLoop.metrics.effortEstimate}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 glass-button-primary py-2 text-sm">
                      Update Status
                    </button>
                    <button className="flex-1 glass-button py-2 text-sm">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}