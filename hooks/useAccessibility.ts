'use client'

import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

// Keyboard navigation hook
export function useKeyboardNavigation() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('global-search')?.focus()
      }

      // Command/Ctrl + / for help
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        router.push('/help')
      }

      // Alt + D for dashboard
      if (e.altKey && e.key === 'd') {
        e.preventDefault()
        router.push('/dashboard')
      }

      // Alt + S for settings
      if (e.altKey && e.key === 's') {
        e.preventDefault()
        router.push('/dashboard/settings')
      }

      // Alt + M for messages/SMS
      if (e.altKey && e.key === 'm') {
        e.preventDefault()
        router.push('/dashboard/sms')
      }

      // Alt + L for loops
      if (e.altKey && e.key === 'l') {
        e.preventDefault()
        router.push('/dashboard/loops')
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]')
        if (modal) {
          const closeButton = modal.querySelector('[aria-label="Close"]') as HTMLElement
          closeButton?.click()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])
}

// Focus trap for modals and dialogs
export function useFocusTrap(isActive = true) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [isActive])

  return containerRef
}

// Announce screen reader messages
export function useAnnouncer() {
  const [announcement, setAnnouncement] = useState('')
  const announcerRef = useRef<HTMLDivElement>(null)

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message)

    if (announcerRef.current) {
      announcerRef.current.setAttribute('aria-live', priority)
    }

    // Clear announcement after 1 second
    setTimeout(() => setAnnouncement(''), 1000)
  }, [])

  const Announcer = () => {
    return React.createElement('div', {
      ref: announcerRef,
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      className: 'sr-only'
    }, announcement)
  }

  return { announce, Announcer }
}

// Mobile touch gestures
export function useSwipeGesture(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  threshold = 50
) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const deltaX = touchEnd.x - touchStart.x
    const deltaY = touchEnd.y - touchStart.y
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (absX > threshold || absY > threshold) {
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onSwipeDown?.()
        } else {
          onSwipeUp?.()
        }
      }
    }
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

// Responsive breakpoint detection
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Common breakpoints
export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1536px)')

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop
  }
}

// Intersection observer for lazy loading
export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [options])

  return { targetRef, isIntersecting }
}

// Reduced motion preference
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(media.matches)

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}

// Click outside handler
export function useClickOutside(
  handler: () => void,
  excludeRefs: React.RefObject<HTMLElement>[] = []
) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Check if click is inside main ref
      if (ref.current && ref.current.contains(target)) {
        return
      }

      // Check if click is inside any exclude refs
      const isInsideExcludeRef = excludeRefs.some(
        excludeRef => excludeRef.current && excludeRef.current.contains(target)
      )

      if (!isInsideExcludeRef) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside as any)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as any)
    }
  }, [handler, excludeRefs])

  return ref
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}