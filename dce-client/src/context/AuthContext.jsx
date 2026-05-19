import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

function decodeToken(token) {
  try {
    const base64 = token.split('.')[1]
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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

  function login(token) {
    localStorage.setItem('dce_token', token)
    const decoded = decodeToken(token)
    setUser(decoded)
  }

  function logout() {
    localStorage.removeItem('dce_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
