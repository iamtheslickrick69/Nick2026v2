// Authentication System for LoopSync Dashboard
import { create } from 'zustand'

export type UserRole = 'admin' | 'manager' | 'employee' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  phone?: string
  avatar?: string
  permissions: Permission[]
}

export interface Permission {
  resource: string
  actions: ('view' | 'create' | 'update' | 'delete')[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
}

// Demo users for testing different roles
const demoUsers: Record<string, User> = {
  admin: {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@loopsync.com',
    role: 'admin',
    department: 'Executive',
    avatar: '/avatars/sarah.jpg',
    permissions: [
      { resource: 'all', actions: ['view', 'create', 'update', 'delete'] }
    ]
  },
  manager: {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@loopsync.com',
    role: 'manager',
    department: 'Engineering',
    avatar: '/avatars/marcus.jpg',
    permissions: [
      { resource: 'loops', actions: ['view', 'update'] },
      { resource: 'employees', actions: ['view'] },
      { resource: 'insights', actions: ['view'] }
    ]
  },
  employee: {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@loopsync.com',
    role: 'employee',
    department: 'Marketing',
    avatar: '/avatars/emily.jpg',
    permissions: [
      { resource: 'own_feedback', actions: ['view', 'create'] },
      { resource: 'public_insights', actions: ['view'] }
    ]
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: demoUsers.admin, // Start with admin for demo
  isAuthenticated: true, // Auto-authenticated for demo

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Demo login - accept any password, determine user by email
    let user: User | null = null

    if (email.includes('admin')) {
      user = demoUsers.admin
    } else if (email.includes('manager')) {
      user = demoUsers.manager
    } else if (email.includes('employee')) {
      user = demoUsers.employee
    } else {
      // Default to admin for demo
      user = { ...demoUsers.admin, email, name: email.split('@')[0] }
    }

    set({ user, isAuthenticated: true })
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  switchRole: (role: UserRole) => {
    const user = demoUsers[role] || demoUsers.admin
    set({ user, isAuthenticated: true })
  }
}))

// Permission helper functions
export function hasPermission(
  user: User | null,
  resource: string,
  action: 'view' | 'create' | 'update' | 'delete'
): boolean {
  if (!user) return false

  // Admin has all permissions
  if (user.role === 'admin') return true

  // Check specific permissions
  return user.permissions.some(p =>
    (p.resource === resource || p.resource === 'all') &&
    p.actions.includes(action)
  )
}

export function canViewDashboard(user: User | null): boolean {
  return !!user
}

export function canManageLoops(user: User | null): boolean {
  return hasPermission(user, 'loops', 'update')
}

export function canViewAllFeedback(user: User | null): boolean {
  return user?.role === 'admin' || user?.role === 'manager'
}