import { useEffect, useRef, useCallback } from 'react'

const IDLE_TIMEOUT_MS = 3 * 60 * 1000        // 3 minutes → auto-logout
const WARN_BEFORE_MS  = 30 * 1000             // warn 30 s before logout

/**
 * Tracks user inactivity.
 * @param {boolean}  isLoggedIn  – only activates when the user is authenticated
 * @param {Function} onWarn      – called when IDLE_TIMEOUT_MS - WARN_BEFORE_MS elapses
 * @param {Function} onLogout    – called when IDLE_TIMEOUT_MS elapses
 */
export default function useIdleTimer(isLoggedIn, onWarn, onLogout) {
  const warnTimer   = useRef(null)
  const logoutTimer = useRef(null)

  const clearTimers = useCallback(() => {
    clearTimeout(warnTimer.current)
    clearTimeout(logoutTimer.current)
  }, [])

  const resetTimers = useCallback(() => {
    if (!isLoggedIn) return
    clearTimers()
    warnTimer.current   = setTimeout(onWarn,   IDLE_TIMEOUT_MS - WARN_BEFORE_MS)
    logoutTimer.current = setTimeout(onLogout, IDLE_TIMEOUT_MS)
  }, [isLoggedIn, onWarn, onLogout, clearTimers])

  useEffect(() => {
    if (!isLoggedIn) {
      clearTimers()
      return
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click']

    const handleActivity = () => resetTimers()

    events.forEach(e => window.addEventListener(e, handleActivity, { passive: true }))
    resetTimers() // kick off on mount / login

    return () => {
      events.forEach(e => window.removeEventListener(e, handleActivity))
      clearTimers()
    }
  }, [isLoggedIn, resetTimers, clearTimers])

  // Expose reset so the warning modal's "Stay logged in" button can reset timers
  return { resetTimers }
}
