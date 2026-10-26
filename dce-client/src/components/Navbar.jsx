import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handler = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)

      if (currentScrollY > lastScrollY && currentScrollY > 400) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY) {
        setHidden(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  function handleLogout() { logout(); navigate('/') }

  const navLinks = [
    { label: 'Shop', to: '/products' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  const isActive = (to) => location.pathname.startsWith(to) && to !== '/'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255, 255, 255, 0.92)' : '#FFFFFF',
        borderBottom: '1px solid #e2e8f0',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'background 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 1px 3px rgba(15, 23, 42, 0.05)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 80, gap: 32 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/dce-logo.png" alt="DCE Projects Logo" style={{ height: '110px', objectFit: 'contain', display: 'block' }} />
          </Link>

          {/* Center Nav */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 40 }} className="hidden-mobile">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase',
                color: isActive(l.to) ? '#0f172a' : '#475569',
                borderBottom: isActive(l.to) ? '1px solid #0f172a' : '1px solid transparent',
                paddingBottom: 4, transition: 'color 0.2s, border-color 0.2s',
                position: 'relative',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#0f172a'
                  const indicator = e.currentTarget.querySelector('.nav-indicator')
                  if (indicator) indicator.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive(l.to) ? '#0f172a' : '#475569'
                  const indicator = e.currentTarget.querySelector('.nav-indicator')
                  if (indicator) indicator.style.opacity = '0'
                }}
              >{l.label}
                <span className="nav-indicator" style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0, height: 1,
                  background: '#1e3a8a', opacity: isActive(l.to) ? '1' : '0',
                  transition: 'opacity 0.2s',
                }} />
              </Link>
            ))}
          </div>

          {/* Right — Auth */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }} className="hidden-mobile">
            {user ? (
              <>
                <span style={{ fontSize: 13, color: '#475569' }}>Hi, {user.name?.split(' ')[0]}</span>
                <Link to="/dashboard" className="btn-ghost-light" style={{ fontSize: 13, padding: '10px 24px' }}>Dashboard</Link>
                <button onClick={handleLogout} className="btn-primary" style={{ fontSize: 13, padding: '10px 24px' }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost" style={{ fontSize: 13, padding: '10px 24px' }}>Login</Link>
                <Link to="/register" className="btn-primary" style={{ fontSize: 13, padding: '10px 24px' }}>Register</Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }} className="show-mobile">
            <button onClick={() => setMobileOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f172a' }}>
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            background: '#FFFFFF', borderTop: '1px solid #e2e8f0',
            padding: '24px', display: 'flex', flexDirection: 'column', gap: 20,
            animation: 'slide-down 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
          }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                textDecoration: 'none', fontSize: 14, fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                color: isActive(l.to) ? '#0f172a' : '#475569',
              }}>{l.label}</Link>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-ghost" style={{ textAlign: 'center', fontSize: 13, padding: '10px 24px' }}>Dashboard</Link>
                  <button onClick={handleLogout} className="btn-primary" style={{ border: 'none', cursor: 'pointer', textAlign: 'center', fontSize: 13, padding: '10px 24px' }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost" style={{ textAlign: 'center', fontSize: 13, padding: '10px 24px' }}>Login</Link>
                  <Link to="/register" className="btn-primary" style={{ textAlign: 'center', fontSize: 13, padding: '10px 24px' }}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}

      </nav>

      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          :root { --navbar-height: 80px; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          :root { --navbar-height: 80px; }
        }
      `}</style>
    </>
  )
}
