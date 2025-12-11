"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Users,
  MessageSquare,
  Webhook,
  ChevronRight,
  Check,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Trash2,
} from "lucide-react"

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "team", label: "Team Members", icon: Users },
  { id: "integrations", label: "Integrations", icon: Webhook },
  { id: "appearance", label: "Appearance", icon: Palette },
]

const teamMembers = [
  { id: 1, name: "John Doe", email: "john@company.com", role: "Admin", avatar: "JD", status: "active" },
  { id: 2, name: "Sarah Kim", email: "sarah@company.com", role: "Manager", avatar: "SK", status: "active" },
  { id: 3, name: "Mike Chen", email: "mike@company.com", role: "Viewer", avatar: "MC", status: "pending" },
]

const integrations = [
  { name: "Slack", description: "Send alerts and insights to Slack channels", connected: true, icon: "💬" },
  { name: "Microsoft Teams", description: "Integrate with Teams for notifications", connected: false, icon: "🟦" },
  { name: "HRIS (Workday)", description: "Sync employee data automatically", connected: true, icon: "👥" },
  { name: "SSO (Okta)", description: "Single sign-on authentication", connected: false, icon: "🔐" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    urgentAlerts: true,
    weeklyDigest: true,
    newInsights: true,
    teamUpdates: false,
    marketingEmails: false,
  })

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#202020] mb-1">Profile Settings</h3>
              <p className="text-sm text-[#666666]">Manage your personal account settings</p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-6 p-6 bg-[#F5F3F0] rounded-2xl">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E07850] to-[#1B7F8E] flex items-center justify-center text-white text-2xl font-semibold">
                JD
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#202020] mb-1">Profile Photo</p>
                <p className="text-sm text-[#666666] mb-3">JPG, PNG or GIF. Max 2MB.</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl bg-white border border-[#E5E5E5] text-sm font-medium text-[#202020] flex items-center gap-2 hover:bg-[#F5F3F0] transition-colors">
                    <Upload size={14} />
                    Upload
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-[#E5E5E5] text-sm font-medium text-red-600 flex items-center gap-2 hover:bg-red-50 transition-colors">
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">First Name</label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-[#202020] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">Last Name</label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-[#202020] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
                  <input
                    type="email"
                    defaultValue="john@company.com"
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-[#202020] outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-[#202020] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#202020] mb-2">Role</label>
                <input
                  type="text"
                  defaultValue="HR Director"
                  className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-[#202020] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
              <button className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-sm font-medium text-[#666666] hover:bg-[#F5F3F0] transition-colors">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )

      case "organization":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#202020] mb-1">Organization Settings</h3>
              <p className="text-sm text-[#666666]">Manage your company profile and preferences</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">Company Name</label>
                <input
                  type="text"
                  defaultValue="Acme Corporation"
                  className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent focus:border-[#E07850]/30 focus:bg-white text-[#202020] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">Industry</label>
                <select className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent text-[#202020] outline-none cursor-pointer">
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Retail</option>
                  <option>Manufacturing</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#202020] mb-2">Company Size</label>
                  <select className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent text-[#202020] outline-none cursor-pointer">
                    <option>50-100 employees</option>
                    <option>100-250 employees</option>
                    <option>250-500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202020] mb-2">Timezone</label>
                  <select className="w-full h-11 px-4 rounded-xl bg-[#F5F3F0] border border-transparent text-[#202020] outline-none cursor-pointer">
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>
              </div>

              {/* Anonymity Settings */}
              <div className="p-5 bg-[#F5F3F0] rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B7F8E]/10 flex items-center justify-center">
                    <Shield size={18} className="text-[#1B7F8E]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[#202020] mb-1">Anonymity Threshold</h4>
                    <p className="text-sm text-[#666666] mb-3">
                      Minimum group size for aggregate insights to prevent identification
                    </p>
                    <select className="h-10 px-4 rounded-xl bg-white border border-[#E5E5E5] text-[#202020] outline-none cursor-pointer">
                      <option>3 employees (minimum)</option>
                      <option>5 employees (recommended)</option>
                      <option>10 employees (high privacy)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E5E5]">
              <button className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-sm font-medium text-[#666666] hover:bg-[#F5F3F0] transition-colors">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#202020] mb-1">Notification Preferences</h3>
              <p className="text-sm text-[#666666]">Choose how and when you want to be notified</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "urgentAlerts",
                  title: "Urgent Alerts",
                  desc: "Critical issues requiring immediate attention",
                  icon: AlertTriangle,
                },
                {
                  key: "weeklyDigest",
                  title: "Weekly Digest",
                  desc: "Summary of insights and trends every Monday",
                  icon: Mail,
                },
                {
                  key: "newInsights",
                  title: "New Coro Insights",
                  desc: "AI-generated insights as they're detected",
                  icon: Sparkles,
                },
                {
                  key: "teamUpdates",
                  title: "Team Updates",
                  desc: "Changes in team health scores and trends",
                  icon: Users,
                },
                {
                  key: "marketingEmails",
                  title: "Product Updates",
                  desc: "New features and product announcements",
                  icon: MessageSquare,
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-[#F5F3F0] rounded-xl hover:bg-[#ECEAE6] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                      <item.icon size={18} className="text-[#666666]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#202020]">{item.title}</p>
                      <p className="text-sm text-[#666666]">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof prev],
                      }))
                    }
                    className={`w-12 h-7 rounded-full p-1 transition-all ${
                      notifications[item.key as keyof typeof notifications] ? "bg-[#1B7F8E]" : "bg-[#E5E5E5]"
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                      animate={{
                        x: notifications[item.key as keyof typeof notifications] ? 20 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#202020] mb-1">Security Settings</h3>
              <p className="text-sm text-[#666666]">Manage your account security and authentication</p>
            </div>

            {/* Password Change */}
            <div className="p-5 bg-[#F5F3F0] rounded-2xl space-y-4">
              <h4 className="font-medium text-[#202020]">Change Password</h4>
              <div>
                <label className="block text-sm font-medium text-[#202020] mb-2">Current Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full h-11 pl-11 pr-12 rounded-xl bg-white border border-[#E5E5E5] text-[#202020] outline-none focus:border-[#E07850]/30 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a9a9a] hover:text-[#202020]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#202020] mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#E5E5E5] text-[#202020] outline-none focus:border-[#E07850]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202020] mb-2">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full h-11 px-4 rounded-xl bg-white border border-[#E5E5E5] text-[#202020] outline-none focus:border-[#E07850]/30 transition-all"
                  />
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl bg-[#202020] text-white text-sm font-medium hover:bg-[#404040] transition-colors">
                Update Password
              </button>
            </div>

            {/* Two Factor */}
            <div className="p-5 border border-[#E5E5E5] rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Shield size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[#202020]">Two-Factor Authentication</p>
                    <p className="text-sm text-emerald-600">Enabled</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl border border-[#E5E5E5] text-sm font-medium text-[#666666] hover:bg-[#F5F3F0] transition-colors">
                  Manage
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="p-5 border border-[#E5E5E5] rounded-2xl">
              <h4 className="font-medium text-[#202020] mb-4">Active Sessions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F5F3F0] rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Chrome on macOS</p>
                    <p className="text-xs text-[#666666]">San Francisco, CA • Current session</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F5F3F0] rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Safari on iPhone</p>
                    <p className="text-xs text-[#666666]">San Francisco, CA • 2 hours ago</p>
                  </div>
                  <button className="text-sm text-red-600 hover:underline">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        )

      case "team":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#202020] mb-1">Team Members</h3>
                <p className="text-sm text-[#666666]">Manage who has access to your LoopSync dashboard</p>
              </div>
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <Users size={16} />
                Invite Member
              </button>
            </div>

            <div className="border border-[#E5E5E5] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-[#F5F3F0] text-xs font-medium text-[#666666] uppercase tracking-wider">
                <div className="col-span-5">Member</div>
                <div className="col-span-3">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2"></div>
              </div>
              <div className="divide-y divide-[#E5E5E5]">
                {teamMembers.map((member) => (
                  <div key={member.id} className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-[#F5F3F0]/50">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B7F8E] to-[#06b6d4] flex items-center justify-center text-white text-sm font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#202020]">{member.name}</p>
                        <p className="text-xs text-[#666666]">{member.email}</p>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <select className="h-8 px-3 rounded-lg bg-[#F5F3F0] border-none text-sm text-[#202020] cursor-pointer outline-none">
                        <option selected={member.role === "Admin"}>Admin</option>
                        <option selected={member.role === "Manager"}>Manager</option>
                        <option selected={member.role === "Viewer"}>Viewer</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          member.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <button className="text-sm text-red-600 hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#202020] mb-1">Integrations</h3>
              <p className="text-sm text-[#666666]">Connect LoopSync with your existing tools</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#E07850]/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium text-[#202020]">{integration.name}</p>
                        <p className="text-xs text-[#666666]">{integration.description}</p>
                      </div>
                    </div>
                    {integration.connected && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                        <Check size={12} />
                        Connected
                      </span>
                    )}
                  </div>
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                      integration.connected
                        ? "border border-[#E5E5E5] text-[#666666] hover:bg-[#F5F3F0]"
                        : "bg-gradient-to-r from-[#E07850] to-[#C9643D] text-white hover:shadow-lg"
                    }`}
                  >
                    {integration.connected ? "Configure" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#202020] mb-1">Appearance</h3>
              <p className="text-sm text-[#666666]">Customize how LoopSync looks for you</p>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "light", label: "Light", bg: "bg-white", active: true },
                  { id: "dark", label: "Dark", bg: "bg-[#1a1a1a]", active: false },
                  { id: "system", label: "System", bg: "bg-gradient-to-r from-white to-[#1a1a1a]", active: false },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme.active ? "border-[#E07850]" : "border-[#E5E5E5] hover:border-[#E07850]/30"
                    }`}
                  >
                    <div className={`w-full h-16 rounded-lg ${theme.bg} border border-[#E5E5E5] mb-3`} />
                    <p className="text-sm font-medium text-[#202020]">{theme.label}</p>
                    {theme.active && <span className="text-xs text-[#E07850]">Current</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-3">Accent Color</label>
              <div className="flex gap-3">
                {[
                  { color: "#E07850", name: "Coral" },
                  { color: "#1B7F8E", name: "Teal" },
                  { color: "#3b82f6", name: "Blue" },
                  { color: "#8b5cf6", name: "Purple" },
                  { color: "#10b981", name: "Emerald" },
                ].map((accent) => (
                  <button
                    key={accent.color}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      accent.color === "#E07850" ? "border-[#202020] scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: accent.color }}
                    title={accent.name}
                  />
                ))}
              </div>
            </div>

            {/* Density */}
            <div>
              <label className="block text-sm font-medium text-[#202020] mb-3">Display Density</label>
              <div className="flex gap-2">
                {["Compact", "Comfortable", "Spacious"].map((density) => (
                  <button
                    key={density}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      density === "Comfortable"
                        ? "bg-[#E07850] text-white"
                        : "bg-[#F5F3F0] text-[#666666] hover:bg-[#ECEAE6]"
                    }`}
                  >
                    {density}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar />

      <main className="min-h-screen" style={{ marginLeft: 260 }}>
        <DashboardHeader title="Settings" subtitle="Manage your account and organization preferences" />

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <div className="col-span-12 lg:col-span-3">
              <nav className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-[#F5F3F0] text-[#E07850] font-medium"
                        : "text-[#666666] hover:bg-[#F5F3F0]/50"
                    }`}
                  >
                    <tab.icon size={18} />
                    <span className="text-sm">{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="col-span-12 lg:col-span-9">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 border border-[#E5E5E5]"
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Import icons for notification settings
const AlertTriangle = ({ size, className }: { size: number; className?: string }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
)

const Sparkles = ({ size, className }: { size: number; className?: string }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)
