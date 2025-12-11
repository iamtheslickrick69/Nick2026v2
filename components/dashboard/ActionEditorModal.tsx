"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, User, Flag, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { useDashboardStore } from "@/lib/dashboardStore"

export default function ActionEditorModal() {
  const { actionEditorModal, setActionEditorModal } = useDashboardStore()

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [owner, setOwner] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState<"not_started" | "in_progress" | "completed">("not_started")
  const [linkedFeedback, setLinkedFeedback] = useState("")

  // Populate form if editing existing action
  useEffect(() => {
    if (actionEditorModal?.action) {
      const action = actionEditorModal.action
      setTitle(action.title || "")
      setDescription(action.description || "")
      setOwner(action.owner || "")
      setPriority(action.priority || "medium")
      setDueDate(action.dueDate ? action.dueDate.toISOString().split("T")[0] : "")
      setStatus(action.status || "not_started")
      setLinkedFeedback(action.linkedFeedback || "")
    } else {
      // Reset form for new action
      setTitle("")
      setDescription("")
      setOwner("")
      setPriority("medium")
      setDueDate("")
      setStatus("not_started")
      setLinkedFeedback("")
    }
  }, [actionEditorModal])

  const handleClose = () => {
    setActionEditorModal(null)
  }

  const handleSave = () => {
    // TODO: Implement actual save logic
    console.log("Saving action:", {
      title,
      description,
      owner,
      priority,
      dueDate,
      status,
      linkedFeedback,
    })
    handleClose()
  }

  const getPriorityStyles = (p: string) => {
    switch (p) {
      case "critical":
        return { bg: "bg-red-50", border: "border-red-500", text: "text-red-600", active: "bg-red-500" }
      case "high":
        return { bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-600", active: "bg-orange-500" }
      case "medium":
        return { bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-600", active: "bg-yellow-500" }
      case "low":
        return { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-600", active: "bg-blue-500" }
      default:
        return { bg: "bg-gray-50", border: "border-gray-500", text: "text-gray-600", active: "bg-gray-500" }
    }
  }

  const getStatusIcon = (s: string) => {
    switch (s) {
      case "completed":
        return <CheckCircle2 size={16} className="text-green-600" />
      case "in_progress":
        return <Clock size={16} className="text-amber-600" />
      case "not_started":
        return <AlertCircle size={16} className="text-gray-600" />
      default:
        return null
    }
  }

  if (!actionEditorModal) return null

  const isEdit = !!actionEditorModal.action

  return (
    <AnimatePresence>
      {actionEditorModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5E5E5] bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {isEdit ? "Edit Action Item" : "Create New Action"}
                    </h2>
                    <p className="text-sm text-white/80">
                      {isEdit ? "Update the details below" : "Define an action item to track and close feedback loops"}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-[#202020] mb-2">
                    Action Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Schedule 1:1 with Engineering team lead"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B7F8E] outline-none text-[#202020] placeholder:text-[#9a9a9a] transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-[#202020] mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide context, background, and any relevant details..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B7F8E] outline-none text-[#202020] placeholder:text-[#9a9a9a] transition-colors resize-none"
                  />
                </div>

                {/* Owner + Due Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Owner */}
                  <div>
                    <label className="block text-sm font-semibold text-[#202020] mb-2">
                      <User size={14} className="inline mr-1" />
                      Owner <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      placeholder="e.g., Sarah K."
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B7F8E] outline-none text-[#202020] placeholder:text-[#9a9a9a] transition-colors"
                    />
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-semibold text-[#202020] mb-2">
                      <Calendar size={14} className="inline mr-1" />
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B7F8E] outline-none text-[#202020] transition-colors"
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-[#202020] mb-2">
                    <Flag size={14} className="inline mr-1" />
                    Priority
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {(["low", "medium", "high", "critical"] as const).map((p) => {
                      const styles = getPriorityStyles(p)
                      const isSelected = priority === p
                      return (
                        <button
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`px-4 py-3 rounded-xl border-2 font-medium text-sm capitalize transition-all ${
                            isSelected
                              ? `${styles.border} ${styles.bg} ${styles.text}`
                              : "border-[#E5E5E5] text-[#666666] hover:border-[#E07850]/30"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-[#202020] mb-2">Status</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { value: "not_started", label: "Not Started" },
                        { value: "in_progress", label: "In Progress" },
                        { value: "completed", label: "Completed" },
                      ] as const
                    ).map((s) => {
                      const isSelected = status === s.value
                      return (
                        <button
                          key={s.value}
                          onClick={() => setStatus(s.value)}
                          className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                            isSelected
                              ? "border-[#1B7F8E] bg-[#1B7F8E]/10 text-[#1B7F8E]"
                              : "border-[#E5E5E5] text-[#666666] hover:border-[#E07850]/30"
                          }`}
                        >
                          {getStatusIcon(s.value)}
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Linked Feedback */}
                <div>
                  <label className="block text-sm font-semibold text-[#202020] mb-2">Linked Feedback (Optional)</label>
                  <input
                    type="text"
                    value={linkedFeedback}
                    onChange={(e) => setLinkedFeedback(e.target.value)}
                    placeholder="Feedback ID or reference"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B7F8E] outline-none text-[#202020] placeholder:text-[#9a9a9a] transition-colors"
                  />
                  <p className="text-xs text-[#666666] mt-1">Link this action to specific feedback for context</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#E5E5E5] bg-[#F5F3F0] flex items-center justify-between">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[#666666] font-medium text-sm hover:bg-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!title || !owner || !dueDate}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1B7F8E] to-[#06b6d4] text-white font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEdit ? "Save Changes" : "Create Action"}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
