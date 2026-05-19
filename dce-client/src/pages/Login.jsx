import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import api from '../api/axios.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data.token)
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {/* Brand mark */}
      <Link to="/" style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0A0A' }}>DCE Projects</div>
      </Link>

      <div style={{ width: '100%', maxWidth: 420, background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 40 }}>
        <h1 style={{ fontSize: 26, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', marginBottom: 6 }}>Welcome back</h1>
        <p style={{ fontSize: 14, color: '#4A4A4A', marginBottom: 32 }}>Sign in to your DCE Projects account</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={labelSt}>Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} color="#888" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ ...inputSt, paddingLeft: 42 }}
                onFocus={e => e.target.style.borderColor = '#1D592C'}
                onBlur={e => e.target.style.borderColor = '#CCCCCC'}
              />
            </div>
          </div>

          <div>
            <label style={labelSt}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="#888" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputSt, paddingLeft: 42, paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = '#1D592C'}
                onBlur={e => e.target.style.borderColor = '#CCCCCC'}
              />
              <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ textAlign: 'right', marginTop: 6 }}>
              <span style={{ fontSize: 12, color: '#1D592C', cursor: 'pointer' }}>Forgot password?</span>
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{ padding: '13px 0', background: loading ? '#888' : '#1D592C', color: '#F0EDE1', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ fontSize: 14, color: '#4A4A4A', textAlign: 'center', marginTop: 24 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#1D592C', textDecoration: 'none', fontWeight: 600 }}>Create one free</Link>
        </p>
      </div>
    </div>
  )
}

const labelSt = { display: 'block', fontSize: 13, color: '#4A4A4A', marginBottom: 6, fontWeight: 500 }
const inputSt = { width: '100%', background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: '12px 14px', color: '#0A0A0A', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s' }
