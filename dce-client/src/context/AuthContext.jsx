import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useIdleTimer from '../hooks/useIdleTimer'
import IdleWarningModal from '../components/IdleWarningModal'

const AuthContext = createContext(null)

const WARN_SECONDS = 30 // countdown shown in the modal

function decodeToken(token) {
  try {
    const base64 = token.split('.')[1]
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [loading, setLoading]     = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [countdown, setCountdown] = useState(WARN_SECONDS)
  const countdownRef              = useRef(null)
  const navigate                  = useNavigate()

  /* ── Bootstrap: read token from localStorage ── */
  useEffect(() => {
    const token = localStorage.getItem('dce_token')
    if (token) {
      const decoded = decodeToken(token)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser(decoded)
      } else {
        localStorage.removeItem('dce_token')
      }
    }
    setLoading(false)
  }, [])

  /* ── Core auth actions ── */
  function login(token) {
    localStorage.setItem('dce_token', token)
    const decoded = decodeToken(token)
    setUser(decoded)
  }

  const logout = useCallback((reason = 'manual') => {
    clearInterval(countdownRef.current)
    setShowWarning(false)
    setCountdown(WARN_SECONDS)
    localStorage.removeItem('dce_token')
    setUser(null)

    if (reason === 'idle') {
      toast.error('You were logged out due to inactivity.')
    }

    navigate('/login', { replace: true })
  }, [navigate])

  /* ── Idle warning: start 30-s countdown ── */
  const handleWarn = useCallback(() => {
    setShowWarning(true)
    setCountdown(WARN_SECONDS)

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  /* ── Idle timeout: actually log out ── */
  const handleIdleLogout = useCallback(() => {
    logout('idle')
  }, [logout])

  /* ── Idle timer hook ── */
  const { resetTimers } = useIdleTimer(!!user, handleWarn, handleIdleLogout)

  /* ── "Stay logged in" button ── */
  const handleStay = useCallback(() => {
    clearInterval(countdownRef.current)
    setShowWarning(false)
    setCountdown(WARN_SECONDS)
    resetTimers()
    toast.success('Session extended. Welcome back!')
  }, [resetTimers])

  /* ── Cleanup on unmount ── */
  useEffect(() => () => clearInterval(countdownRef.current), [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}

      {/* Idle warning modal — rendered inside the provider so it always overlays */}
      <IdleWarningModal
        visible={showWarning}
        countdown={countdown}
        onStay={handleStay}
        onLogout={() => logout('idle')}
      />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
