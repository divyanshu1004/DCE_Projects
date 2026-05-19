import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Heart, Settings, LogOut, ChevronRight, X, HardHat } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  pending: { bg: 'rgba(255,179,0,0.12)', color: '#FFB300', border: '#FFB300' },
  confirmed: { bg: 'rgba(200,241,53,0.12)', color: '#1D592C', border: '#1D592C' },
  completed: { bg: 'rgba(136,136,136,0.12)', color: '#4A4A4A', border: '#4A4A4A' },
  cancelled: { bg: 'rgba(255,92,43,0.12)', color: '#FF5C2B', border: '#FF5C2B' },
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({ name: user?.name || '', phone: '', address: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/bookings/my')
      .then(r => setBookings(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function cancelBooking(id) {
    try {
      await api.patch(`/bookings/${id}/cancel`)
      setBookings(b => b.map(bk => bk._id === id ? { ...bk, status: 'cancelled' } : bk))
      toast.success('Booking cancelled')
    } catch { toast.error('Cancel failed') }
  }

  function handleLogout() { logout(); navigate('/') }

  const stats = [
    { label: 'Active Bookings', value: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length, color: '#1D592C' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#4FC3F7' },
    { label: 'Total Spent (est.)', value: '₹' + (bookings.reduce((a, b) => a + (b.totalCost || 0), 0)).toLocaleString(), color: '#FFB300' },
  ]

  const nav = [
    { id: 'overview', icon: <LayoutDashboard size={16} />, label: 'Overview' },
    { id: 'bookings', icon: <BookOpen size={16} />, label: 'My Bookings' },
    { id: 'settings', icon: <Settings size={16} />, label: 'Profile Settings' },
  ]

  return (
    <div className="flex flex-col md:flex-row" style={{ background: '#F0EDE1', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="w-full md:w-[240px] md:fixed md:top-0 md:bottom-0 md:left-0 z-50 flex flex-col" style={{ background: '#E5E3D8', borderRight: '1px solid #CCCCCC', borderBottom: '1px solid #CCCCCC' }}>
        {/* Logo */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #CCCCCC' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <HardHat size={20} color="#1D592C" />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#1D592C' }}>DCE Projects</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="hidden md:block" style={{ padding: '20px 24px', borderBottom: '1px solid #CCCCCC' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #1D592C, #88a824)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE1' }}>{(user?.name || 'U')[0].toUpperCase()}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>{user?.name}</div>
          <div style={{ fontSize: 12, color: '#4A4A4A', marginTop: 2 }}>{user?.email}</div>
          <div style={{ marginTop: 8, display: 'inline-block', fontSize: 10, fontWeight: 700, color: '#1D592C', background: 'rgba(200,241,53,0.1)', border: '1px solid rgba(200,241,53,0.3)', padding: '2px 8px', borderRadius: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {user?.role || 'client'}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible" style={{ flex: 1, padding: '0' }}>
          {nav.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className="whitespace-nowrap md:whitespace-normal" style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '16px 24px', background: activeTab === item.id ? 'rgba(200,241,53,0.08)' : 'transparent',
              borderLeft: `3px solid ${activeTab === item.id ? '#1D592C' : 'transparent'}`,
              border: 'none', cursor: 'pointer',
              color: activeTab === item.id ? '#1D592C' : '#4A4A4A',
              fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s',
            }}>
              {item.icon} <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="hidden md:block" style={{ padding: 16, borderTop: '1px solid #CCCCCC' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: 'transparent', border: '1px solid #CCCCCC', borderRadius: 0, cursor: 'pointer', color: '#4A4A4A', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-[240px] w-full p-6 md:p-10" style={{ minWidth: 0 }}>
        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: 15, color: '#4A4A4A', marginBottom: 36 }}>Here's your DCE Projects activity summary.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 24 }}>
                  <div style={{ fontSize: 30, fontWeight:  400, fontFamily: 'DM Serif Display', color: s.color, marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#4A4A4A' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Bookings Preview */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A', marginBottom: 16 }}>Recent Bookings</h2>
            {bookings.slice(0, 3).map(b => <BookingRow key={b._id} booking={b} onCancel={cancelBooking} />)}
            {bookings.length === 0 && !loading && (
              <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 40, textAlign: 'center' }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>📦</p>
                <p style={{ color: '#4A4A4A' }}>No bookings yet. <Link to="/services" style={{ color: '#1D592C' }}>Browse services</Link></p>
              </div>
            )}
          </div>
        )}

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div>
            <h1 style={{ fontSize: 28, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 32 }}>My Bookings</h1>
            {loading ? (
              <p style={{ color: '#4A4A4A' }}>Loading bookings…</p>
            ) : bookings.length === 0 ? (
              <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 60, textAlign: 'center' }}>
                <p style={{ fontSize: 40, marginBottom: 16 }}>📋</p>
                <p style={{ color: '#4A4A4A', fontSize: 16, marginBottom: 20 }}>You haven't made any bookings yet.</p>
                <Link to="/services" style={{ display: 'inline-block', background: '#1D592C', color: '#F0EDE1', fontWeight: 700, padding: '12px 24px', borderRadius: 0, textDecoration: 'none' }}>Browse Services</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {bookings.map(b => <BookingRow key={b._id} booking={b} onCancel={cancelBooking} showFull />)}
              </div>
            )}
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ fontSize: 28, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 32 }}>Profile Settings</h1>
            <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'Full Name', id: 'settings-name', key: 'name', type: 'text' },
                  { label: 'Phone Number', id: 'settings-phone', key: 'phone', type: 'tel' },
                  { label: 'Address', id: 'settings-address', key: 'address', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 12, color: '#4A4A4A', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
                    <input id={f.id} type={f.type} value={profile[f.key]} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: '12px 14px', color: '#0A0A0A', fontSize: 15, fontFamily: 'Inter, sans-serif', outline: 'none' }}
                    />
                  </div>
                ))}
                <button disabled={saving} style={{ padding: '12px 0', background: '#1D592C', color: '#F0EDE1', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function BookingRow({ booking, onCancel, showFull }) {
  const sc = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
  const isProduct = booking.itemType === 'product'
  return (
    <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{booking.itemType === 'service' ? 'Service Booking' : 'Equipment Rental'}</div>
        <div style={{ fontSize: 12, color: '#4A4A4A', marginTop: 2 }}>{new Date(booking.startDate).toLocaleDateString('en-IN')} → {new Date(booking.endDate).toLocaleDateString('en-IN')}</div>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 0, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {booking.status}
      </span>
      {booking.totalCost > 0 && <span style={{ fontSize: 14, fontWeight: 600, color: '#1D592C' }}>₹{booking.totalCost?.toLocaleString()}</span>}
      {(booking.status === 'pending' || booking.status === 'confirmed') && (
        <button onClick={() => onCancel(booking._id)} style={{ fontSize: 12, color: '#FF5C2B', background: 'transparent', border: '1px solid rgba(255,92,43,0.3)', borderRadius: 0, padding: '4px 12px', cursor: 'pointer' }}>Cancel</button>
      )}
    </div>
  )
}
