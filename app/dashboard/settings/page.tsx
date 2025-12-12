"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Users,
  Webhook,
  ChevronRight,
  Check,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Save,
  Globe,
  Key,
  Database,
  Zap,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  MessageSquare,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Download,
  RefreshCw
} from "lucide-react"
import { useAuthStore } from "@/lib/auth"

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User, description: "Personal information" },
  { id: "organization", label: "Organization", icon: Building, description: "Company settings" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alert preferences" },
  { id: "security", label: "Security", icon: Shield, description: "Password & access" },
  { id: "integrations", label: "Integrations", icon: Webhook, description: "Connected apps" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Theme & display" },
  { id: "api", label: "API", icon: Key, description: "Developer settings" }
]

const integrations = [
  {
    name: "Slack",
    description: "Send alerts and insights to Slack channels",
    connected: true,
    icon: "💬",
    category: "Communication"
  },
  {
    name: "Microsoft Teams",
    description: "Integrate with Teams for notifications",
    connected: false,
    icon: "🟦",
    category: "Communication"
  },
  {
    name: "Twilio",
    description: "SMS messaging and voice calls",
    connected: true,
    icon: "📱",
    category: "Communication"
  },
  {
    name: "OpenAI",
    description: "AI-powered insights and analysis",
    connected: true,
    icon: "🤖",
    category: "AI"
  },
  {
    name: "Salesforce",
    description: "Sync customer data automatically",
    connected: false,
    icon: "☁️",
    category: "CRM"
  },
  {
    name: "HubSpot",
    description: "Marketing and sales alignment",
    connected: false,
    icon: "🟠",
    category: "CRM"
  }
]

const notificationSettings = [
  { id: "email_daily", label: "Daily summary email", enabled: true, type: "email" },
  { id: "email_urgent", label: "Urgent alerts", enabled: true, type: "email" },
  { id: "sms_critical", label: "Critical issues via SMS", enabled: false, type: "sms" },
  { id: "slack_updates", label: "Slack notifications", enabled: true, type: "slack" },
  { id: "browser_push", label: "Browser push notifications", enabled: false, type: "browser" },
  { id: "weekly_report", label: "Weekly analytics report", enabled: true, type: "email" }
]

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  const activeTabData = settingsTabs.find(tab => tab.id === activeTab)

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar Navigation */}
      <div className="w-64 glass-card p-4 overflow-y-auto">
        <h2 className="font-semibold text-sm mb-4 text-[#202020] dark:text-white">Settings</h2>
        <nav className="space-y-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4] text-white shadow-md"
                    : "hover:bg-[#F5F3F0] dark:hover:bg-[#1a1a1a] text-[#666666] dark:text-[#999999]"
                }`}
              >
                <Icon size={18} />
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${activeTab === tab.id ? "text-white" : ""}`}>
                    {tab.label}
                  </p>
                  <p className={`text-xs ${activeTab === tab.id ? "text-white/80" : "text-[#999999]"}`}>
                    {tab.description}
                  </p>
                </div>
                <ChevronRight size={16} className={activeTab === tab.id ? "text-white" : ""} />
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 glass-card p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#202020] dark:text-white mb-1">
            {activeTabData?.label}
          </h1>
          <p className="text-sm text-[#666666]">{activeTabData?.description}</p>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-6 pb-6 border-b border-[#E5E5E5] dark:border-[#202020]">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center text-3xl text-white font-bold">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-[#1a1a1a] rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Upload size={14} />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#202020] dark:text-white">{user?.name}</h3>
                <p className="text-sm text-[#666666]">{user?.role}</p>
                <p className="text-sm text-[#666666]">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="glass-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="glass-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={user?.phone || "+1 (555) 123-4567"}
                  className="glass-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Department
                </label>
                <select className="glass-input w-full">
                  <option>{user?.department || "Engineering"}</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Product</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Organization Tab */}
        {activeTab === "organization" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="LoopSync Inc."
                  className="glass-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Industry
                </label>
                <select className="glass-input w-full">
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Retail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Company Size
                </label>
                <select className="glass-input w-full">
                  <option>1-50 employees</option>
                  <option>51-200 employees</option>
                  <option>201-1000 employees</option>
                  <option>1000+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                  Time Zone
                </label>
                <select className="glass-input w-full">
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#202020] dark:text-white mb-2">
                Company Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Innovation Way, San Francisco, CA 94105"
                className="glass-input w-full"
              />
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]"
                >
                  <div className="flex items-center gap-3">
                    {setting.type === "email" && <Mail size={18} className="text-[#666666]" />}
                    {setting.type === "sms" && <Phone size={18} className="text-[#666666]" />}
                    {setting.type === "slack" && <MessageSquare size={18} className="text-[#666666]" />}
                    {setting.type === "browser" && <Globe size={18} className="text-[#666666]" />}
                    <div>
                      <p className="text-sm font-medium text-[#202020] dark:text-white">
                        {setting.label}
                      </p>
                      <p className="text-xs text-[#666666]">
                        Receive via {setting.type}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className="relative"
                  >
                    <div className={`w-12 h-6 rounded-full transition-all ${
                      setting.enabled ? "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]" : "bg-[#E5E5E5]"
                    }`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        setting.enabled ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-amber-600 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Email Verification Required
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Please verify your email address to receive notifications.
                  </p>
                  <button className="mt-2 text-xs text-amber-600 hover:text-amber-700 font-medium">
                    Resend verification email
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="glass-input w-full pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#666666] hover:text-[#202020] dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="glass-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666666] mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="glass-input w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Two-Factor Authentication
              </h3>
              <div className="p-4 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="text-green-600" size={20} />
                    <div>
                      <p className="text-sm font-medium text-[#202020] dark:text-white">
                        2FA is enabled
                      </p>
                      <p className="text-xs text-[#666666]">
                        Your account is secured with two-factor authentication
                      </p>
                    </div>
                  </div>
                  <button className="glass-button px-3 py-1 text-xs">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Active Sessions
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Monitor className="text-[#666666]" size={18} />
                      <div>
                        <p className="text-sm font-medium">Chrome on MacBook Pro</p>
                        <p className="text-xs text-[#666666]">San Francisco, CA • Current session</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600">Active now</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="text-[#666666]" size={18} />
                      <div>
                        <p className="text-sm font-medium">Safari on iPhone</p>
                        <p className="text-xs text-[#666666]">San Francisco, CA • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-700">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="p-4 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-[#202020] dark:text-white">
                          {integration.name}
                        </h4>
                        <span className="text-xs text-[#666666]">{integration.category}</span>
                      </div>
                    </div>
                    {integration.connected && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Check size={12} />
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#666666] mb-3">
                    {integration.description}
                  </p>
                  <button className={`w-full py-2 rounded-lg text-xs font-medium transition-all ${
                    integration.connected
                      ? "bg-[#E5E5E5] dark:bg-[#202020] text-[#666666] hover:bg-red-50 hover:text-red-600"
                      : "glass-button-primary"
                  }`}>
                    {integration.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Theme Preference
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === "light"
                      ? "border-[#14b8a6] bg-[#14b8a6]/10"
                      : "border-[#E5E5E5] dark:border-[#202020] hover:border-[#14b8a6]/50"
                  }`}
                >
                  <Sun className="mx-auto mb-2 text-[#666666]" size={24} />
                  <p className="text-sm font-medium">Light</p>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === "dark"
                      ? "border-[#14b8a6] bg-[#14b8a6]/10"
                      : "border-[#E5E5E5] dark:border-[#202020] hover:border-[#14b8a6]/50"
                  }`}
                >
                  <Moon className="mx-auto mb-2 text-[#666666]" size={24} />
                  <p className="text-sm font-medium">Dark</p>
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === "system"
                      ? "border-[#14b8a6] bg-[#14b8a6]/10"
                      : "border-[#E5E5E5] dark:border-[#202020] hover:border-[#14b8a6]/50"
                  }`}
                >
                  <Monitor className="mx-auto mb-2 text-[#666666]" size={24} />
                  <p className="text-sm font-medium">System</p>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Display Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                  <span className="text-sm">Compact Mode</span>
                  <button className="relative">
                    <div className="w-12 h-6 rounded-full bg-[#E5E5E5]">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                  <span className="text-sm">Show Animations</span>
                  <button className="relative">
                    <div className="w-12 h-6 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]">
                      <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-md" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                  <span className="text-sm">High Contrast</span>
                  <button className="relative">
                    <div className="w-12 h-6 rounded-full bg-[#E5E5E5]">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* API Tab */}
        {activeTab === "api" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                API Keys
              </h3>
              <div className="p-4 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-[#202020] dark:text-white">
                      Production API Key
                    </p>
                    <p className="text-xs text-[#666666]">Created on Jan 15, 2024</p>
                  </div>
                  <button
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    className="glass-button flex items-center gap-2 px-3 py-1 text-xs"
                  >
                    {apiKeyVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                    {apiKeyVisible ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="font-mono text-xs p-2 bg-white dark:bg-[#0a0a0a] rounded border border-[#E5E5E5] dark:border-[#202020]">
                  {apiKeyVisible
                    ? "sk_live_xxxxxxxxxxxxxxxxxxxx"
                    : "sk_live_••••••••••••••••••••••••"}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button className="glass-button flex items-center gap-1 px-3 py-1 text-xs">
                    <RefreshCw size={12} />
                    Regenerate
                  </button>
                  <button className="glass-button flex items-center gap-1 px-3 py-1 text-xs">
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Webhook Endpoints
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">https://api.example.com/webhook</p>
                      <p className="text-xs text-[#666666]">All events • Active</p>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
                <button className="glass-button-primary w-full py-2 text-sm">
                  Add Endpoint
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#202020] dark:text-white mb-4">
                Rate Limits
              </h3>
              <div className="p-4 rounded-lg bg-[#F5F3F0] dark:bg-[#1a1a1a]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#666666]">Current Plan</span>
                    <span className="font-medium">Pro</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#666666]">Requests per minute</span>
                    <span className="font-medium">1,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#666666]">Requests today</span>
                    <span className="font-medium">12,543 / 100,000</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E5E5E5] dark:border-[#202020]">
          <p className="text-xs text-[#666666]">
            Last updated: 2 minutes ago
          </p>
          <button
            onClick={handleSave}
            className="glass-button-primary flex items-center gap-2"
          >
            {saveStatus === "saving" ? (
              <>
                <RefreshCw className="animate-spin" size={16} />
                Saving...
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Check size={16} />
                Saved
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}