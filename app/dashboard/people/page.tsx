"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  MoreVertical,
  ChevronRight,
  Download,
  Upload,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Briefcase,
  MapPin,
  Hash,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Settings
} from "lucide-react"
import { useAuthStore } from "@/lib/auth"

// Employee data
const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    joinDate: "2022-03-15",
    status: "active",
    avatar: "SJ",
    satisfaction: 92,
    feedbackCount: 15,
    lastFeedback: "2 days ago",
    performance: "excellent",
    manager: "Marcus Johnson",
    skills: ["React", "Node.js", "AWS", "Python"],
    projects: ["Project Alpha", "Platform Migration"],
    riskLevel: "low"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@company.com",
    phone: "+1 (555) 234-5678",
    role: "Engineering Manager",
    department: "Engineering",
    location: "San Francisco, CA",
    joinDate: "2021-01-10",
    status: "active",
    avatar: "MJ",
    satisfaction: 88,
    feedbackCount: 32,
    lastFeedback: "1 day ago",
    performance: "excellent",
    manager: "David Lee",
    skills: ["Leadership", "Architecture", "Agile", "Cloud"],
    projects: ["Team Growth", "Tech Strategy"],
    riskLevel: "low"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    phone: "+1 (555) 345-6789",
    role: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    joinDate: "2021-06-20",
    status: "active",
    avatar: "ER",
    satisfaction: 75,
    feedbackCount: 8,
    lastFeedback: "1 week ago",
    performance: "good",
    manager: "Lisa Chen",
    skills: ["Brand Strategy", "Digital Marketing", "Analytics", "SEO"],
    projects: ["Q1 Campaign", "Brand Refresh"],
    riskLevel: "medium"
  },
  {
    id: 4,
    name: "Alex Kumar",
    email: "alex.k@company.com",
    phone: "+1 (555) 456-7890",
    role: "Product Designer",
    department: "Product",
    location: "Remote",
    joinDate: "2022-09-01",
    status: "active",
    avatar: "AK",
    satisfaction: 95,
    feedbackCount: 12,
    lastFeedback: "3 days ago",
    performance: "excellent",
    manager: "Jennifer White",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    projects: ["Mobile App", "Design System 2.0"],
    riskLevel: "low"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@company.com",
    phone: "+1 (555) 567-8901",
    role: "HR Director",
    department: "HR",
    location: "Chicago, IL",
    joinDate: "2020-11-15",
    status: "active",
    avatar: "LA",
    satisfaction: 82,
    feedbackCount: 25,
    lastFeedback: "5 days ago",
    performance: "good",
    manager: "CEO",
    skills: ["Talent Management", "Culture", "Compliance", "HRIS"],
    projects: ["DEI Initiative", "Performance Review"],
    riskLevel: "low"
  },
  {
    id: 6,
    name: "Michael Chen",
    email: "michael.c@company.com",
    phone: "+1 (555) 678-9012",
    role: "Sales Representative",
    department: "Sales",
    location: "Austin, TX",
    joinDate: "2023-02-01",
    status: "probation",
    avatar: "MC",
    satisfaction: 68,
    feedbackCount: 5,
    lastFeedback: "2 weeks ago",
    performance: "needs improvement",
    manager: "Robert Smith",
    skills: ["CRM", "Negotiation", "Cold Calling", "Presentations"],
    projects: ["Enterprise Accounts", "Q2 Pipeline"],
    riskLevel: "high"
  }
]

// Customer data
const customers = [
  {
    id: 101,
    name: "TechCorp Inc.",
    contactName: "John Davis",
    email: "john.davis@techcorp.com",
    phone: "+1 (555) 111-2222",
    segment: "Enterprise",
    industry: "Technology",
    location: "Seattle, WA",
    joinDate: "2021-05-15",
    status: "active",
    avatar: "TC",
    satisfaction: 85,
    lifetimeValue: "$2.5M",
    lastInteraction: "1 day ago",
    health: "healthy",
    accountManager: "Sarah Wilson",
    products: ["Platform Pro", "API Access", "Support Plus"],
    tickets: 3,
    churnRisk: "low"
  },
  {
    id: 102,
    name: "Global Retail Co",
    contactName: "Maria Garcia",
    email: "maria.g@globalretail.com",
    phone: "+1 (555) 333-4444",
    segment: "Enterprise",
    industry: "Retail",
    location: "New York, NY",
    joinDate: "2020-08-20",
    status: "active",
    avatar: "GR",
    satisfaction: 72,
    lifetimeValue: "$1.8M",
    lastInteraction: "3 days ago",
    health: "at risk",
    accountManager: "Marcus Lee",
    products: ["Platform Standard", "Analytics"],
    tickets: 8,
    churnRisk: "medium"
  },
  {
    id: 103,
    name: "StartupHub",
    contactName: "Alex Thompson",
    email: "alex@startuphub.io",
    phone: "+1 (555) 555-6666",
    segment: "SMB",
    industry: "Software",
    location: "San Francisco, CA",
    joinDate: "2023-01-10",
    status: "active",
    avatar: "SH",
    satisfaction: 92,
    lifetimeValue: "$120K",
    lastInteraction: "2 hours ago",
    health: "excellent",
    accountManager: "Emily Chen",
    products: ["Starter Plan", "Growth Tools"],
    tickets: 1,
    churnRisk: "low"
  },
  {
    id: 104,
    name: "Finance Plus",
    contactName: "Robert Johnson",
    email: "r.johnson@financeplus.com",
    phone: "+1 (555) 777-8888",
    segment: "Mid-Market",
    industry: "Finance",
    location: "Chicago, IL",
    joinDate: "2022-03-25",
    status: "renewal",
    avatar: "FP",
    satisfaction: 78,
    lifetimeValue: "$450K",
    lastInteraction: "1 week ago",
    health: "healthy",
    accountManager: "David Park",
    products: ["Platform Pro", "Compliance Suite"],
    tickets: 2,
    churnRisk: "low"
  }
]

export default function PeoplePage() {
  const { user } = useAuthStore()
  const [viewMode, setViewMode] = useState<"employees" | "customers">("employees")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Filter data based on view mode
  const currentData = viewMode === "employees" ? employees : customers

  const filteredData = currentData.filter((person: any) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (person.role || person.industry || "").toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = filterDepartment === "all" ||
      (viewMode === "employees" ? person.department === filterDepartment : person.segment === filterDepartment)

    const matchesStatus = filterStatus === "all" || person.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Stats calculation
  const stats = {
    total: currentData.length,
    active: currentData.filter((p: any) => p.status === "active").length,
    avgSatisfaction: Math.round(currentData.reduce((acc: number, p: any) => acc + p.satisfaction, 0) / currentData.length),
    atRisk: viewMode === "employees"
      ? employees.filter(e => e.riskLevel === "high").length
      : customers.filter(c => c.churnRisk === "high").length
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="text-[#14b8a6]" size={20} />
            <span className="text-xs text-[#666666]">Total</span>
          </div>
          <p className="text-2xl font-bold gradient-text">{stats.total}</p>
          <p className="text-xs text-[#666666] mt-1">
            {viewMode === "employees" ? "Employees" : "Customers"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-[#06b6d4]" size={20} />
            <CheckCircle className="text-green-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{stats.active}</p>
          <p className="text-xs text-[#666666] mt-1">Active</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Star className="text-[#3b82f6]" size={20} />
            <TrendingUp className="text-green-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-[#202020] dark:text-white">{stats.avgSatisfaction}%</p>
          <p className="text-xs text-[#666666] mt-1">Avg Satisfaction</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <TrendingDown className="text-red-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.atRisk}</p>
          <p className="text-xs text-[#666666] mt-1">At Risk</p>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("employees")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  viewMode === "employees"
                    ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white"
                    : "hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]"
                }`}
              >
                <Users className="inline mr-2" size={16} />
                Employees
              </button>
              <button
                onClick={() => setViewMode("customers")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  viewMode === "customers"
                    ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white"
                    : "hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666]"
                }`}
              >
                <Briefcase className="inline mr-2" size={16} />
                Customers
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                placeholder={`Search ${viewMode}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 py-2 text-sm w-64"
              />
            </div>

            {/* Filters */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">
                All {viewMode === "employees" ? "Departments" : "Segments"}
              </option>
              {viewMode === "employees" ? (
                <>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Product">Product</option>
                  <option value="HR">HR</option>
                </>
              ) : (
                <>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Mid-Market">Mid-Market</option>
                  <option value="SMB">SMB</option>
                </>
              )}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              {viewMode === "employees" && <option value="probation">Probation</option>}
              {viewMode === "customers" && <option value="renewal">Renewal</option>}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="glass-button flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button className="glass-button flex items-center gap-2">
              <Upload size={16} />
              Import
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="glass-button-primary flex items-center gap-2"
            >
              <UserPlus size={16} />
              Add {viewMode === "employees" ? "Employee" : "Customer"}
            </button>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#202020]">
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Name</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">
                  {viewMode === "employees" ? "Role" : "Segment"}
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">
                  {viewMode === "employees" ? "Department" : "Industry"}
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Location</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Satisfaction</th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">
                  {viewMode === "employees" ? "Performance" : "Health"}
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">
                  {viewMode === "employees" ? "Risk" : "Churn Risk"}
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((person: any) => (
                <motion.tr
                  key={person.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedPerson(person)}
                  className="border-b border-[#E5E5E5] dark:border-[#202020] hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] transition-all cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                        viewMode === "employees"
                          ? "bg-gradient-to-br from-[#14b8a6] to-[#06b6d4]"
                          : "bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]"
                      }`}>
                        {person.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#202020] dark:text-white">
                          {viewMode === "employees" ? person.name : person.contactName}
                        </p>
                        <p className="text-xs text-[#666666]">{person.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-[#666666]">
                      {viewMode === "employees" ? person.role : person.segment}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-[#666666]">
                      {viewMode === "employees" ? person.department : person.industry}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#666666]" />
                      <p className="text-sm text-[#666666]">{person.location}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[#F5F3F0] dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            person.satisfaction >= 80
                              ? "bg-green-500"
                              : person.satisfaction >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${person.satisfaction}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#666666]">{person.satisfaction}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      (person.performance === "excellent" || person.health === "excellent")
                        ? "bg-green-100 text-green-600"
                        : (person.performance === "good" || person.health === "healthy")
                        ? "bg-blue-100 text-blue-600"
                        : (person.performance === "needs improvement" || person.health === "at risk")
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {viewMode === "employees" ? person.performance : person.health}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      (person.riskLevel === "low" || person.churnRisk === "low")
                        ? "bg-green-100 text-green-600"
                        : (person.riskLevel === "medium" || person.churnRisk === "medium")
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {viewMode === "employees" ? person.riskLevel : person.churnRisk}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle edit
                        }}
                        className="p-1.5 hover:bg-[#F5F3F0] dark:hover:bg-[#202020] rounded-lg transition-all"
                      >
                        <Edit size={14} className="text-[#666666]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle message
                        }}
                        className="p-1.5 hover:bg-[#F5F3F0] dark:hover:bg-[#202020] rounded-lg transition-all"
                      >
                        <MessageSquare size={14} className="text-[#666666]" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle more options
                        }}
                        className="p-1.5 hover:bg-[#F5F3F0] dark:hover:bg-[#202020] rounded-lg transition-all"
                      >
                        <MoreVertical size={14} className="text-[#666666]" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="p-12 text-center">
            <Users className="mx-auto mb-4 text-[#666666]" size={48} />
            <p className="text-[#666666]">No {viewMode} found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPerson(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-3xl max-h-[80vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[#E5E5E5] dark:border-[#202020]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-white ${
                      viewMode === "employees"
                        ? "bg-gradient-to-br from-[#14b8a6] to-[#06b6d4]"
                        : "bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]"
                    }`}>
                      {selectedPerson.avatar}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#202020] dark:text-white">
                        {viewMode === "employees" ? selectedPerson.name : selectedPerson.contactName}
                      </h2>
                      <p className="text-sm text-[#666666]">
                        {viewMode === "employees" ? selectedPerson.role : selectedPerson.name}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-[#666666]">
                          <Mail size={12} /> {selectedPerson.email}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#666666]">
                          <Phone size={12} /> {selectedPerson.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPerson(null)}
                    className="p-2 hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] rounded-lg transition-all"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#666666]">
                          {viewMode === "employees" ? "Department" : "Industry"}
                        </span>
                        <span className="font-medium">
                          {viewMode === "employees" ? selectedPerson.department : selectedPerson.industry}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#666666]">Location</span>
                        <span className="font-medium">{selectedPerson.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#666666]">Joined</span>
                        <span className="font-medium">{selectedPerson.joinDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#666666]">
                          {viewMode === "employees" ? "Manager" : "Account Manager"}
                        </span>
                        <span className="font-medium">
                          {viewMode === "employees" ? selectedPerson.manager : selectedPerson.accountManager}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#666666] mb-2">
                      {viewMode === "employees" ? "Skills" : "Products"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(viewMode === "employees" ? selectedPerson.skills : selectedPerson.products).map((item: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full bg-[#F5F3F0] dark:bg-[#1a1a1a] text-[#666666]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        <p className="text-xs text-[#666666] mb-1">Satisfaction</p>
                        <p className="text-lg font-bold gradient-text">{selectedPerson.satisfaction}%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                        <p className="text-xs text-[#666666] mb-1">
                          {viewMode === "employees" ? "Feedback" : "Tickets"}
                        </p>
                        <p className="text-lg font-bold text-[#202020] dark:text-white">
                          {viewMode === "employees" ? selectedPerson.feedbackCount : selectedPerson.tickets}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#666666] mb-2">Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#666666]">Current Status</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedPerson.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                          {selectedPerson.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#666666]">
                          {viewMode === "employees" ? "Risk Level" : "Churn Risk"}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          (selectedPerson.riskLevel === "low" || selectedPerson.churnRisk === "low")
                            ? "bg-green-100 text-green-600"
                            : (selectedPerson.riskLevel === "medium" || selectedPerson.churnRisk === "medium")
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}>
                          {viewMode === "employees" ? selectedPerson.riskLevel : selectedPerson.churnRisk}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 glass-button-primary py-2 text-sm">
                      <MessageSquare className="inline mr-2" size={14} />
                      Message
                    </button>
                    <button className="flex-1 glass-button py-2 text-sm">
                      <Settings className="inline mr-2" size={14} />
                      Manage
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