import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone, Eye, EyeOff, HardHat, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'client' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field) { return e => setForm(f => ({ ...f, [field]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name, email: form.email, phone: form.phone,
        password: form.password, role: form.role,
      })
      login(data.token)
      toast.success('Account created! Welcome to DCE Projects.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0EDE1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A0A0A' }}>DCE Projects</div>
        </div>

        <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: '40px 36px' }}>
          <h2 style={{ fontSize: 26, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 8 }}>Create your account</h2>
          

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <InputField id="reg-name" label="Full Name" icon={<User size={15} color="#888" />} type="text" placeholder="Rajesh Kumar" value={form.name} onChange={set('name')} required />
            <InputField id="reg-email" label="Email address" icon={<Mail size={15} color="#888" />} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
            <InputField id="reg-phone" label="Phone Number" icon={<Phone size={15} color="#888" />} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} required />
            <InputField id="reg-password" label="Password" icon={<Lock size={15} color="#888" />} type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={set('password')} required
              suffix={<button type="button" onClick={() => setShowPw(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex' }}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
            />
            <InputField id="reg-confirm" label="Confirm Password" icon={<Lock size={15} color="#888" />} type={showPw ? 'text' : 'password'} placeholder="Re-enter password" value={form.confirmPassword} onChange={set('confirmPassword')} required />

            {/* Role Selector */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#4A4A4A', marginBottom: 8 }}>I am a</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: 'client', label: 'Client', sub: 'I want to hire' },
                  { val: 'worker', label: 'Worker', sub: 'I offer services' },
                ].map(r => (
                  <button key={r.val} type="button" onClick={() => setForm(f => ({ ...f, role: r.val }))} style={{
                    padding: '12px 16px',
                    background: form.role === r.val ? 'rgba(200,241,53,0.1)' : '#FFFFFF',
                    border: `1px solid ${form.role === r.val ? '#1D592C' : '#CCCCCC'}`,
                    borderRadius: 0, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: form.role === r.val ? '#1D592C' : '#0A0A0A' }}>{r.label}</div>
                    <div style={{ fontSize: 12, color: '#4A4A4A', marginTop: 2 }}>{r.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <button id="reg-submit" type="submit" disabled={loading} style={{
              width: '100%', padding: '13px 0',
              background: loading ? '#4A4A4A' : '#1D592C',
              color: '#F0EDE1', fontWeight: 700, fontSize: 15,
              borderRadius: 0, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 8, transition: 'opacity 0.2s',
            }}>
              {loading ? 'Creating account…' : 'Create Free Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#4A4A4A', marginTop: 28 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1D592C', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function InputField({ id, label, icon, type, placeholder, value, onChange, required, suffix }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#4A4A4A', marginBottom: 8 }}>{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: 0, padding: '0 14px', gap: 10, height: 48 }}>
        {icon}
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#0A0A0A', fontSize: 15, fontFamily: 'Inter, sans-serif' }}
        />
        {suffix}
      </div>
    </div>
  )
}
